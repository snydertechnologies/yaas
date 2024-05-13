import createTenantFactory from '@bigcapital/server/database/factories';
import createSystemFactory from '@bigcapital/server/database/factories/system';
import systemDb from '@bigcapital/server/database/knex';
import TenantModel from '@bigcapital/server/models/TenantModel';
import TenantsManager from '@bigcapital/server/system/TenantsManager';
import { hashPassword } from '@bigcapital/server/utils';
import app from 'app';
import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiThings from 'chai-things';
import faker from 'faker';

const { expect } = chai;
const request = () => chai.request(app);

beforeEach(async () => {
  // Rollback/migrate the system database.
  await systemDb.migrate.rollback();
  await systemDb.migrate.latest();
});

afterEach(async () => {});

chai.use(chaiHttp);
chai.use(chaiThings);

// Create tenant database.
const createTenant = () => {
  return TenantsManager.createTenant();
};

// Drops tenant database.
const dropTenant = async (tenantWebsite) => {
  return TenantsManager.dropTenant(tenantWebsite);
};

// Create a new user that associate to the given tenant Db.
const createUser = async (tenantWebsite, givenUser) => {
  const userPassword = givenUser && givenUser.password ? givenUser.password : 'admin';
  const hashedPassword = await hashPassword(userPassword);

  const userInfo = {
    first_name: faker.lorem.word(),
    last_name: faker.lorem.word(),
    email: faker.internet.email(),
    active: 1,
    phone_number: faker.phone.phoneNumberFormat().replace('-', ''),
    password: hashedPassword,
    ...givenUser,
  };
  const user = await TenantsManager.createTenantUser(tenantWebsite, userInfo);
  return user;
};

const login = async (tenantWebsite, givenUser) => {
  let user = givenUser;

  if (!givenUser && tenantWebsite) {
    const createdUser = await createUser(tenantWebsite, givenUser);
    user = createdUser;
  }
  return request().post('/api/auth/login').send({
    crediential: user.email,
    password: 'admin',
  });
};

const bindTenantModel = (tenantDb) => {
  TenantModel.knexBinded = tenantDb;
};

const systemFactory = createSystemFactory();

export {
  login,
  systemFactory,
  createTenantFactory,
  createTenant,
  createUser,
  dropTenant,
  expect,
  request,
  bindTenantModel,
};
