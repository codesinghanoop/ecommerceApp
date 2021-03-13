import axios, {AxiosRequestConfig} from 'axios';
import _ from 'lodash';
import {AxiosInstance} from './mainInstance';

async function makeNetworkCall(
  config: AxiosRequestConfig,
) {
  return AxiosInstance.request(config);
}

export {makeNetworkCall};
