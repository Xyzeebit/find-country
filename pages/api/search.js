export default async function handler(req, res) {
  if(req.method === 'GET') {
    // if(req.query.region) {
    //   res.json({ search: req.query.region });
    // } else  {
    //   res.json({ data: 'welcome Next' });
    // }
    if(req.body.search) {
      console.log(req.body)
      res.end();
    }
  }
}
