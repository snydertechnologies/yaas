import ChartSVG from '../icons/Chart';
import CloudSVG from '../icons/Cloud';
import InventorySVG from '../icons/Inventory';
import MoneySVG from '../icons/Money';
import PaymentSVG from '../icons/Payment';
import ReceiptSVG from '../icons/Receipt';
import HelpSVG from '../icons/Help';
import ShoppingBagSVG from '../icons/ShoppingBag';
import PeopleSVG from '../icons/People';

interface FeatureProps {
  icon?: React.ReactNode;
  title: string;
  desc: string | React.ReactNode;
}

/**
 * Feature component.
 */
function Feature({ icon, title, desc }: FeatureProps) {
  return (
    <div data-slide-to="0">
      {icon && <div className={'mb-[20px]'}>{icon}</div>}
      <h4 className="mb-4 font-semibold opacity-90 text-[20px]">{title}</h4>
      <p className={'opacity-60'}>{desc}</p>
    </div>
  );
}

export function Features() {
  return (
    <div
      id={'features'}
      className={
        'bg-[#06091d] pt-[420px] pb-[40px] md:pb-[60px] text-white py-420 overflow-hidden'
      }
    >
      <div className="opacity-70 relative">
        <img
          className="absolute -top-[900px] left-[1000px] scale-[1.8] z-[-1]"
          src="./blur-2.jpeg"
          alt=""
        />
      </div>

      <div className="container mx-auto px-4 z-1 relative">
        <h2 className="text-white font-extrabold text-[30px] leading-tight mb-[30px] md:text-[40px] md:mb-[60px]">
          Discover the features you need
        </h2>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[40px] md:gap-[45px]">
          <Feature
            icon={<PaymentSVG fill={'#fff'} />}
            title={'Sales & Purchases Invoicing'}
            desc={
              'Create your sell invoices with your customers or purchase invoices with the vendors, manage recurring invoices and easily track customers/vendors payments.'
            }
          />
          <Feature
            icon={<ChartSVG fill={'#fff'} />}
            title={'Financial Reports'}
            desc={
              'You do not have to wait to end of the month to generate business reports. Bigcapital has financial reports to run your business with intelligence.'
            }
          />
          <Feature
            icon={<InventorySVG fill={'#fff'} />}
            title={'Inventory'}
            desc={
              'Easily track your inventory items, and when you buy or sell for an item the stock amount will be automatically incremented or decremented with smart inventory reports.'
            }
          />
          <Feature
            icon={<PeopleSVG fill={'#fff'} />}
            title={'Accountants & Bookkeepers'}
            desc={
              'The software should facilitate collaboration with your accountant, Bigcapital allows to invite users to your organization with role-based permissions.'
            }
          />
          <Feature
            icon={<ReceiptSVG fill={'#fff'} />}
            title={'Expense Accounting'}
            desc={
              'The software gives you a single place to track all business expenses from employee payroll to office renting and categorize them into accounts and bill them to your customers.'
            }
          />
          <Feature
            icon={<MoneySVG fill={'#fff'} />}
            title={'Multi-currency Accounting'}
            desc={
              'Pay and get paid and do manual journals in any currency with real time exchange rates conversions.'
            }
          />
          <Feature
            icon={<HelpSVG fill={'#fff'} />}
            title={'Customer Success'}
            desc={
              'Bigcapital provides free online support, 12 hours a day seven days a week, even if you were using a free subscription plan.'
            }
          />
          <Feature
            icon={<CloudSVG fill={'#fff'} />}
            title={'Cloud Accounting'}
            desc={
              'Your account information is securely stored in the cloud, available anytime on all your devices and track business transactions to see what business is doing from anywhere.'
            }
          />

          <div className="col-12 col-md-6 col-lg-4">
            <Feature
              icon={<ShoppingBagSVG fill={'#fff'} />}
              title={'Easy-to-use Software'}
              desc={
                'Exploring and understanding team, legacy, or foreign projects takes a lot of time and effort, implementations, usages, declarations.'
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
