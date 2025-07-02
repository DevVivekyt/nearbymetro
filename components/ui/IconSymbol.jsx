// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'chevron.left': 'arrow-back',
  'info.circle.fill': 'info',
  'person.crop.circle': 'person',
  'doc.text.image': 'article',
  'train.side.front.car': 'train',
  'square.and.arrow.up': 'share',
  'indian.rupee': 'currency-rupee',
  'arrow-right-arrow-left': 'swap-horiz',
  'circle.m': 'directions-transit',
  'smart-card': 'credit-card',
  'arrow.down.full': 'arrow-downward'

};

export function IconSymbol({ name, size = 24, color, style }) {
  return (
    <MaterialIcons
      color={color}
      size={size}
      name={MAPPING[name]}
      style={style}
    />
  );
}
