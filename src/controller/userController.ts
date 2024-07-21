import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || '';

interface IregisterUserRequest extends Request {
   body: {
      name: string;
      file?: Express.Multer.File;
      email: string;
      password: string;
   }
}

interface IsignInUserRequest extends Request {
   body: {
      email: string;
      password: string;
   }
}
interface Itoken extends Request {
   body: {
      token: string;
   }
}

export default {

   async signInUser(req: IsignInUserRequest, res: Response) {
      const { email, password } = req.body;

      try {
         const user = await prisma.user.findUnique({ where: { email } });

         if (!user) {
            return res.status(400).json({ error: 'Usuário não encontrado.' });
         }
         const isPasswordValid = await bcrypt.compare(password, user.password);

         if (!isPasswordValid) {
            return res.status(400).json({ error: 'Senha inválida.' });
         }
         const token = jwt.sign(
            { userId: user.id, email: user.email }, JWT_SECRET,
            { expiresIn: '4h' } // Tempo de expiração do token
         );

         return res.json({
            message: 'Login feito com sucesso.',
            token,
            user: {
               id: user.id,
               name: user.name,
               email: user.email
            }
         });

      } catch (error) {

      }
   },


   async tokenUser(req: Itoken, res: Response) {
      const { token, } = req.body;

      try {
         // Verify and decode the token
         const decoded = jwt.verify(token, JWT_SECRET) as { userId: number, email: string };

         // Find the user in the database using the decoded user ID
         const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
         });

         if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
         }

         // Return user data
         return res.json({
            user: {
               id: user.id,
               name: user.name,
               email: user.email
            }
         });
      } catch (error) {
         console.error('Error verifying token:', error);
         return res.status(401).json({ error: 'Token inválido.' });
      }
   },


   async registerUser(req: IregisterUserRequest, res: Response): Promise<Response> {
      const { name, email, password } = req.body;
      const requestImage = req.file as Express.Multer.File;

      const image = {
         path: requestImage.filename,
      };

      try {
         const hashedPassword = await bcrypt.hash(password, 10);

         const user = await prisma.user.create({
            data: {
               name,
               email,
               password: hashedPassword,
               Images: {
                  create: image
               },
            },
         });

         return res.status(201).json(user);

      } catch (error) {
         console.error('Error Creating User:', error);
         return res.status(400).json({ error: 'Erro ao criar usuário.' });
      }
   }
}