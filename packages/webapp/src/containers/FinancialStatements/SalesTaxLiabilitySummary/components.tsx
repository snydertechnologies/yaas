import { AppToaster, Stack } from '@bigcapital/webapp/components';
import {
  useSalesTaxLiabilitySummaryCsvExport,
  useSalesTaxLiabilitySummaryXlsxExport,
} from '@bigcapital/webapp/hooks/query';
import { Classes, Intent, Menu, MenuItem, ProgressBar, Text } from '@blueprintjs/core';
import classNames from 'classnames';
// @ts-nocheck
import { useRef } from 'react';
import FinancialLoadingBar from '../FinancialLoadingBar';
import { useSalesByItemsContext } from '../SalesByItems/SalesByItemProvider';
import { useSalesTaxLiabilitySummaryContext } from './SalesTaxLiabilitySummaryBoot';

/**
 * Sales tax liability summary loading bar.
 */
export function SalesTaxLiabilitySummaryLoadingBar() {
  const { isFetching } = useSalesTaxLiabilitySummaryContext();

  if (!isFetching) {
    return null;
  }
  return <FinancialLoadingBar />;
}

/**
 *
 * @returns {JSX.Element}
 */
export function SalesTaxLiabilityExportMenu() {
  const toastKey = useRef(null);
  const commonToastConfig = {
    isCloseButtonShown: true,
    timeout: 2000,
  };
  const { query } = useSalesTaxLiabilitySummaryContext();

  const openProgressToast = (amount: number) => {
    return (
      <Stack spacing={8}>
        <Text>The report has been exported successfully.</Text>
        <ProgressBar
          className={classNames('toast-progress', {
            [Classes.PROGRESS_NO_STRIPES]: amount >= 100,
          })}
          intent={amount < 100 ? Intent.PRIMARY : Intent.SUCCESS}
          value={amount / 100}
        />
      </Stack>
    );
  };

  // Export the report to xlsx.
  const { mutateAsync: xlsxExport } = useSalesTaxLiabilitySummaryXlsxExport(query, {
    onDownloadProgress: (xlsxExportProgress: number) => {
      if (!toastKey.current) {
        toastKey.current = AppToaster.show({
          message: openProgressToast(xlsxExportProgress),
          ...commonToastConfig,
        });
      } else {
        AppToaster.show(
          {
            message: openProgressToast(xlsxExportProgress),
            ...commonToastConfig,
          },
          toastKey.current,
        );
      }
    },
  });
  // Export the report to csv.
  const { mutateAsync: csvExport } = useSalesTaxLiabilitySummaryCsvExport(query, {
    onDownloadProgress: (xlsxExportProgress: number) => {
      if (!toastKey.current) {
        toastKey.current = AppToaster.show({
          message: openProgressToast(xlsxExportProgress),
          ...commonToastConfig,
        });
      } else {
        AppToaster.show(
          {
            message: openProgressToast(xlsxExportProgress),
            ...commonToastConfig,
          },
          toastKey.current,
        );
      }
    },
  });
  // Handle csv export button click.
  const handleCsvExportBtnClick = () => {
    csvExport();
  };
  // Handle xlsx export button click.
  const handleXlsxExportBtnClick = () => {
    xlsxExport();
  };

  return (
    <Menu>
      <MenuItem text={'XLSX (Microsoft Excel)'} onClick={handleXlsxExportBtnClick} />
      <MenuItem text={'CSV'} onClick={handleCsvExportBtnClick} />
    </Menu>
  );
}
