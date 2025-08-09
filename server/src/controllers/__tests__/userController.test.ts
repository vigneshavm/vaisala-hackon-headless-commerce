import { createUserHandler, loginUserHandler, getUserHandler } from '../userController';
import * as userService from '../../services/userServices';
import { Types } from 'mongoose';
describe('User Controller', () => {
    let mockReq: any;
    let mockRes: any;

    beforeEach(() => {
        mockReq = {};
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('createUserHandler', () => {
        it('should create a user and return 201 status', async () => {

            const fakeUser = {
                _id: new Types.ObjectId(),
                id: '123',
                name: 'John',
                password: 'hashedPassword',
                __v: 0
            } as any;

            jest.spyOn(userService, 'createUser').mockResolvedValue(fakeUser);
            mockReq.body = { name: 'John', email: 'john@example.com', password: 'secret' };

            await createUserHandler(mockReq, mockRes);

            expect(userService.createUser).toHaveBeenCalledWith(mockReq.body);
            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith(fakeUser);
        });

        it('should handle errors and return 400', async () => {
            const error = new Error('Validation error');
            jest.spyOn(userService, 'createUser').mockRejectedValue(error);
            mockReq.body = {};

            await createUserHandler(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({ error: 'Validation error' });
        });
    });

    describe('loginUserHandler', () => {
        let mockReq: any;
        let mockRes: any;

        beforeEach(() => {
            mockReq = {};
            mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
        });

        afterEach(() => {
            jest.resetAllMocks();
        });

        it('should login user and return success message', async () => {
            const fakeUser = {
                _id: new Types.ObjectId(),
                id: '123',
                name: 'John',
                password: 'hashedPassword',
                __v: 0
            } as any;

            jest.spyOn(userService, 'getUserByEmail').mockResolvedValue(fakeUser);

            // Add this line — directly override 'comparePassword' in userService object:
            (userService as any).comparePassword = jest.fn().mockResolvedValue(true);

            mockReq.body = { email: 'test@test.com', password: 'password123' };

            await loginUserHandler(mockReq, mockRes);

            expect(userService.getUserByEmail).toHaveBeenCalledWith('test@test.com');
            expect((userService as any).comparePassword).toHaveBeenCalledWith('password123', 'hashedPassword');
            expect(mockRes.json).toHaveBeenCalledWith({ message: 'Login successful', user: fakeUser });
        });

        it('should return 400 if email or password is not string', async () => {
            mockReq.body = { email: 123, password: true };

            await loginUserHandler(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({ message: 'Email and password are required and must be strings' });
        });

        it('should return 401 if user not found', async () => {
            jest.spyOn(userService, 'getUserByEmail').mockResolvedValue(null);

            mockReq.body = { email: 'notfound@test.com', password: 'pass' };

            await loginUserHandler(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(401);
            expect(mockRes.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
        });

       it('should return 401 if password does not match', async () => {
  const fakeUser = { id: '123', email: 'test@test.com', password: 'hashed' } as any;
  
  jest.spyOn(userService, 'getUserByEmail').mockResolvedValue(fakeUser);

  // Mock comparePassword directly on userService object with casting
  (userService as any).comparePassword = jest.fn().mockResolvedValue(false);

  mockReq.body = { email: 'test@test.com', password: 'wrongpassword' };

  await loginUserHandler(mockReq, mockRes);

  expect(mockRes.status).toHaveBeenCalledWith(401);
  expect(mockRes.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
});


        it('should handle errors and return 400', async () => {
            const error = new Error('Unexpected error');
            jest.spyOn(userService, 'getUserByEmail').mockRejectedValue(error);

            mockReq.body = { email: 'test@test.com', password: 'password' };

            await loginUserHandler(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({ error: 'Unexpected error' });
        });
    });

    describe('getUserHandler', () => {
        

  it('should return user if found', async () => {
    const fakeUser = { id: '123', name: 'John' } as any;

    jest.spyOn(userService, 'getUserById').mockResolvedValue(fakeUser);

    mockReq.params = { id: '123' };

    await getUserHandler(mockReq, mockRes);

    expect(userService.getUserById).toHaveBeenCalledWith('123');
    expect(mockRes.json).toHaveBeenCalledWith(fakeUser);
  });


        it('should return 404 if user not found', async () => {
            jest.spyOn(userService, 'getUserById').mockResolvedValue(null);

            mockReq.params = { id: '999' };

            await getUserHandler(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({ message: 'User not found' });
        });

        it('should handle errors and return 400', async () => {
            const error = new Error('DB error');
            jest.spyOn(userService, 'getUserById').mockRejectedValue(error);

            mockReq.params = { id: '123' };

            await getUserHandler(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({ error: 'DB error' });
        });
    });
});
