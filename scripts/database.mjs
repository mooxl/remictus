import * as dotenv from "dotenv";
import { exec } from "child_process";

try {
  const ENVS = dotenv.config({
    path:
      process.env.NODE_ENV === "development"
        ? ".env.development"
        : ".env.production",
  }).parsed;
  let query;
  if (process.env.TASK === "dump") {
    query = `docker exec -i ${ENVS.NAME}_database /bin/sh -c 'PGPASSWORD=${ENVS.DB_PASSWORD} pg_dump --username ${ENVS.DB_USER} ${ENVS.DB_DATABASE}' > ./dump.sql`;
  } else if (process.env.TASK === "migrate") {
    query = `docker stop ${ENVS.NAME}_cms && docker exec -i  ${ENVS.NAME}_database /bin/bash -c "PGPASSWORD=${ENVS.DB_PASSWORD} psql template1 --username ${ENVS.DB_USER} -c 'drop database "${ENVS.DB_DATABASE}";'" && docker exec -i  ${ENVS.NAME}_database /bin/bash -c "PGPASSWORD=${ENVS.DB_PASSWORD} psql template1 --username ${ENVS.DB_USER} -c 'create database "${ENVS.DB_DATABASE}" with owner "${ENVS.DB_USER}"'" && docker exec -i  ${ENVS.NAME}_database /bin/bash -c "PGPASSWORD=${ENVS.DB_PASSWORD} psql --username ${ENVS.DB_USER}" < ./dump.sql && docker start ${ENVS.NAME}_cms`;
  }
  exec(query, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
} catch (error) {
  console.log(
    error,
    "\n\nNODE_ENV has to be defined like NODE_ENV=development yarn dump"
  );
}
