import { IJournalPoster } from '@bigcapital/libs-backend';

export default class JournalFinancial {
  journal: IJournalPoster;

  accountsDepGraph: any;

  /**
   * Journal poster.
   * @param {IJournalPoster} journal
   */
  constructor(journal: IJournalPoster) {
    this.journal = journal;
    this.accountsDepGraph = this.journal.accountsDepGraph;
  }
}
