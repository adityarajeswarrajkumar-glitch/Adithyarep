import { db } from "hatchable";
export const access = "public";
export const methods = ["GET"];
export default async function(req,res){
  const q=(req.query?.q||"").toString().slice(0,100);
  const genre=(req.query?.genre||"").toString().slice(0,50);
  const {rows}=await db.query("SELECT id,title,year,genre,rating,poster,description FROM movies WHERE ($1='' OR title ILIKE '%'||$1||'%') AND ($2='' OR genre=$2) ORDER BY rating DESC",[q,genre]);
  res.json(rows);
}