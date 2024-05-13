import { useAbilityContext } from '@bigcapital/webapp/hooks';
// @ts-nocheck
import { isEmpty } from 'lodash';

export const useFilterShortcutBoxesSection = (section) => {
  const ability = useAbilityContext();

  return section
    .map(({ sectionTitle, shortcuts }) => {
      const shortcut = shortcuts.filter((shortcuts) => {
        return ability.can(shortcuts.ability, shortcuts.subject);
      });
      return {
        sectionTitle: sectionTitle,
        shortcuts: shortcut,
      };
    })
    .filter(({ shortcuts }) => !isEmpty(shortcuts));
};
