import { For } from '@bigcapital/webapp/components';
import { getFooterLinks } from '@bigcapital/webapp/constants/footerLinks';
// @ts-nocheck
import React from 'react';

function FooterLinkItem({ title, link }) {
  return (
    <div className="">
      <a href={link} target="_blank" rel="noopener noreferrer">
        {title}
      </a>
    </div>
  );
}

export default function DashboardFooter() {
  const footerLinks = getFooterLinks();

  return (
    <div className="dashboard__footer">
      <div className="footer-links">
        <For render={FooterLinkItem} of={footerLinks} />
      </div>
    </div>
  );
}
