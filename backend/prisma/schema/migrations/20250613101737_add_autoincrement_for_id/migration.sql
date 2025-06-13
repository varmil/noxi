-- AlterTable
CREATE SEQUENCE channelsubscribercountsummary_id_seq;
ALTER TABLE "ChannelSubscriberCountSummary" ALTER COLUMN "id" SET DEFAULT nextval('channelsubscribercountsummary_id_seq');
ALTER SEQUENCE channelsubscribercountsummary_id_seq OWNED BY "ChannelSubscriberCountSummary"."id";

-- AlterTable
CREATE SEQUENCE channelvideocountsummary_id_seq;
ALTER TABLE "ChannelVideoCountSummary" ALTER COLUMN "id" SET DEFAULT nextval('channelvideocountsummary_id_seq');
ALTER SEQUENCE channelvideocountsummary_id_seq OWNED BY "ChannelVideoCountSummary"."id";

-- AlterTable
CREATE SEQUENCE channelviewcountsummary_id_seq;
ALTER TABLE "ChannelViewCountSummary" ALTER COLUMN "id" SET DEFAULT nextval('channelviewcountsummary_id_seq');
ALTER SEQUENCE channelviewcountsummary_id_seq OWNED BY "ChannelViewCountSummary"."id";
