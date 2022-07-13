import React from 'react';
import {
  faSort,
  faSortUp,
  faSortDown,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { makeClasses } from '../helpers/object';

const ICONS = {
  sort: faSort,
  sortUp: faSortUp,
  sortDown: faSortDown,
  times: faTimes
};

interface FontAwesomeProps {
  icon: keyof typeof ICONS;
  className?: string;
}

/**
 * @internal
 *
 * This is an internal component to render various font awesome icons.
 */
export default function FontAwesome({ icon, className }: FontAwesomeProps) {
  const faIconString = `fa-${icon}`;
  const faClass = makeClasses('fa-solid', faIconString, className);

  return <FontAwesomeIcon className={faClass} icon={ICONS[icon]} />;
}
