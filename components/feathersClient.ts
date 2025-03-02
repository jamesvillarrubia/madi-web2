import {feathers, HookContext} from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';
import { API_HOST, GCP_IAP_HEADERS } from '../constants';
import axios from 'axios';

// Create the Feathers client
const client = feathers();

// Configure Feathers to use REST
client.configure(rest(API_HOST).axios(axios));

// Mock authentication by sending GCP_IAP_HEADERS
client.hooks({
  before: {
    all: [
      async (context:HookContext) => {
        context.params.headers = {
          ...context.params.headers,
          ...GCP_IAP_HEADERS,
        };
        return context;
      },
    ],
  },
});

export default client;