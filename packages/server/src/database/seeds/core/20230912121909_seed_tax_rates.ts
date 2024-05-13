import { TenantSeeder } from '@bigcapital/server/lib/Seeder/TenantSeeder';
import { InitialTaxRates } from '../data/TaxRates';

export default class SeedTaxRates extends TenantSeeder {
  /**
   * Seeds initial tax rates to the organization.
   */
  up(knex) {
    return knex('tax_rates').then(async () => {
      // Inserts seed entries.
      return knex('tax_rates').insert(InitialTaxRates);
    });
  }
}
