import api from './api';
import { DATA_SET } from './endpoints';

export const getXiteContent = (): any => {
  return api().request({
    method: 'get',
    url: DATA_SET,
  });
};