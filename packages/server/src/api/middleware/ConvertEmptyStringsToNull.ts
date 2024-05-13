import { convertEmptyStringToNull } from '@bigcapital/server/utils';
import deepMap from 'deep-map';
import { NextFunction, Request, Response } from 'express';

function convertEmptyStringsToNull(data) {
  return deepMap(data, (value) => convertEmptyStringToNull(value));
}

export default (req: Request, res: Response, next: NextFunction) => {
  const transfomedBody = convertEmptyStringsToNull(req.body);
  req.body = transfomedBody;
  next();
};
