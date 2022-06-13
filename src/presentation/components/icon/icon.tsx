import React from 'react';
import Styles from './icon-styles.scss';

export enum IconName {
  thumbDown = '/assets/icon-thumb-down.png',
  thumbUp = '/assets/icon-thumb-up.png'
}

type Props = {
  iconName: IconName;
  className?: string;
};

const Icon: React.FC<Props> = ({ iconName, className }: Props) => {
  const iconColor = iconName === IconName.thumbDown ? Styles.red : Styles.green;
  return (
    <div className={[Styles.iconWrap, iconColor, className].join(' ')}>
      <img className={Styles.icon} src={iconName} />
    </div>
  );
};

export default Icon;
