-- CreateTable
CREATE TABLE "Action" (
    "id" TEXT NOT NULL,
    "object" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MetaData" (
    "id" TEXT NOT NULL,
    "redirect" TEXT NOT NULL,
    "x_request_id" TEXT NOT NULL,

    CONSTRAINT "MetaData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "object" TEXT NOT NULL,
    "actor_id" TEXT NOT NULL,
    "actor_name" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "action_id" TEXT,
    "target_id" TEXT NOT NULL,
    "target_name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "occurred_at" TIMESTAMP(3) NOT NULL,
    "metadata_id" TEXT,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Event_action_id_key" ON "Event"("action_id");

-- CreateIndex
CREATE UNIQUE INDEX "Event_metadata_id_key" ON "Event"("metadata_id");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_action_id_fkey" FOREIGN KEY ("action_id") REFERENCES "Action"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_metadata_id_fkey" FOREIGN KEY ("metadata_id") REFERENCES "MetaData"("id") ON DELETE SET NULL ON UPDATE CASCADE;
