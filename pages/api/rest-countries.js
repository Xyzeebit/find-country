import { data } from '../../rest-countries';

export default async function handler(req, res) {
  const { current } = req.query;
  const LIMIT = 20;
  var response = {};
  console.log('current', current);
  if(current || current === 0) {
    if(current + LIMIT < data.length) {
      response = { hasMore: true, data: data.slice(current, current + LIMIT) };
    } else {
      response = { hasMore: false, data: data.slice(current) }
    }
  } else {
    response = { hasMore: false, data };
  }
  res.status(200).json(response);
}
