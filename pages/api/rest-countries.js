import { data } from '../../rest-countries';

export default async function handler(req, res) {
  res.json(data);
}
