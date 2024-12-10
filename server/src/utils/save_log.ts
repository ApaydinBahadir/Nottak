import Database from "./database_connection";

async function save_log(
  method: string,
  url: string,
  status: number,
  responseTime: number,
  userAgent: string
) {
  const db = Database.getInstance();
  const query = `
    INSERT INTO logs (method, url, status, response_time, user_agent)
    VALUES ($1, $2, $3, $4, $5);
  `;

  try {
    await db.query(query, [method, url, status, responseTime, userAgent]);
  } catch (error) {
    console.error("Error saving log to database:", error);
  }
}

export default save_log;
