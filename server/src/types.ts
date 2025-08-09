import express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
        // add other user properties you expect here
      };
    }
  }
}
