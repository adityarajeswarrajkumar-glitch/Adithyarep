import { db, auth } from "hatchable";
export const access = "public";
export const methods = ["GET","POST"];
export default async function(req,res){
  if(req.method==="GET"){
    const id=String(req.query?.movie_id||"");
    const {rows}=await db.query("SELECT rating,review,created_at FROM reviews WHERE movie_id=$1 ORDER BY created_at DESC",[id]);
    return res.json(rows);
  }
  const user=await auth.getUser(req);
  if(!user) return res.status(401).json({error:"Please sign in to post a review."});
  const b=req.body||{}, movieId=String(b.movie_id||""), rating=Number(b.rating), review=String(b.review||"").trim();
  if(!movieId||rating<1||rating>10||!review||review.length>1000) return res.status(400).json({error:"Movie, rating (1-10), and review are required."});
  await db.query("INSERT INTO reviews(movie_id,user_id,rating,review) VALUES($1,$2,$3,$4)",[movieId,String(user.id),rating,review]);
  res.json({ok:true});
}