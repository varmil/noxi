-- AddForeignKey
ALTER TABLE "HyperTrainContribution" ADD CONSTRAINT "HyperTrainContribution_hyperChatId_fkey" FOREIGN KEY ("hyperChatId") REFERENCES "HyperChat"("id") ON DELETE CASCADE ON UPDATE CASCADE;
