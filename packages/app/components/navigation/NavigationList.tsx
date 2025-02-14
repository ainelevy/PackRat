import { useNavigationList } from 'app/hooks/navigation';
import { NavigationItem } from './NavigationItem';
import { useIsMobileView } from 'app/hooks/common';

export const NavigationList = ({
  itemStyle = null,
  onItemSelect = () => {},
}) => {
  const isMobileView = useIsMobileView();
  const { navigationItems } = useNavigationList();
  return (
    <>
      {navigationItems?.map((item) => (
        <NavigationItem
          item={item}
          itemStyle={itemStyle}
          key={item.href}
          onSelect={onItemSelect}
          isMobileView={isMobileView}
        />
      ))}
    </>
  );
};
