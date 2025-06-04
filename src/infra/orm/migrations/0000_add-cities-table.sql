CREATE TABLE "cities" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "cities_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"state" char(2) NOT NULL,
	"ddd" integer NOT NULL,
	CONSTRAINT "cities_name_state_unique" UNIQUE("name","state")
);
--> statement-breakpoint
CREATE INDEX "cities_ddd_index" ON "cities" USING btree ("ddd");