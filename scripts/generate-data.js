#!/usr/bin/env node

import { faker } from '@faker-js/faker';
import * as fs from 'fs';

const N = 100;

var payload = [];
for (let i = 0; i < N; i++) {
    const obj = {
        _id: i,
        name: faker.word.noun(),
        posts: faker.number.int({max: 1000000}),
    }
    payload = [...payload, obj]
}

const data = {
    payload: payload,
}

const jsonData = JSON.stringify(data, null, 2);
fs.writeFileSync("data.json", jsonData);

console.log(payload)
