import React from 'react';
import { makeClasses } from '../helpers/object';

type FontAwesomeProps = {
  icon: string;
  additionalClass: string;
};

export default function FontAwesome({
  icon,
  additionalClass
}: FontAwesomeProps) {
  const faIconString = `fa-${icon}`;
  const faClass = makeClasses('fa', faIconString, additionalClass);

  return <i className={faClass} aria-hidden="true" />;
}
