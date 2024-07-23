import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

interface IRegisterTransactionRequest extends Request {
   body: {
      type: 'income' | 'expense';
      description: string;
      amount: number;
      userId: number;
   }
}

export default {
   async registerTransaction(req: IRegisterTransactionRequest, res: Response): Promise<Response> {
      const { description, amount, type, userId } = req.body;

      if (!description || amount <= 0 || !['income', 'expense'].includes(type) || !userId) {
         return res.status(400).json({ error: 'Dados inválidos.' });
      }

      try {
         const user = await prisma.user.findUnique({
            where: { id: userId },
         });

         if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
         }

         const transaction = await prisma.transaction.create({
            data: {
               amount,
               type,
               description,
               userId,
            },
         });

         return res.status(201).json(transaction);

      } catch (error) {
         console.error('Error Creating transaction:', error);

         if (!res.headersSent) {
            return res.status(500).json({ error: 'Erro ao criar transação.' });
         }
      }
      return res.status(500).json({ error: 'Erro inesperado.' });
   }
}
