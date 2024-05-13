import { useAbilityContext } from '@bigcapital/webapp/hooks';
// @ts-nocheck
import { isEmpty } from 'lodash';

function useFilterFinancialReports(financialSection) {
  const ability = useAbilityContext();

  const section = financialSection
    .map((section) => {
      const reports = section.reports.filter((report) => {
        return ability.can(report.ability, report.subject);
      });

      return {
        sectionTitle: section.sectionTitle,
        reports,
      };
    })
    .filter(({ reports }) => !isEmpty(reports));

  return section;
}

export default useFilterFinancialReports;
