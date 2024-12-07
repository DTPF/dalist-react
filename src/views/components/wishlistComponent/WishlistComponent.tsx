import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import WishlistContext from 'context/wishlist/WishlistContext';
import ThemeContext from 'context/theme/ThemeContext';
import PostNewItem from './postNewItem';
import WishlistItem from './wishListItem';
import Spinner from 'views/UI/spinner';
import { useTranslation } from 'react-i18next';
import { WishList } from 'interfaces/wishlist';
import { Badge, Select } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import './wishlistComponent.scss';

export default function WishlistComponent({ params }: any) {
  const { isLoading, currentWishlist, updateWishlist } = useContext(WishlistContext);
  const navigate = useNavigate();
  const { t: translate } = useTranslation();
  const { currentThemeColor } = useContext(ThemeContext);
  const { colorPrimary, colorPrimaryBg } = currentThemeColor;

  const completedItems = currentWishlist.wishlistItems.filter((item: WishList) => item.isCompleted === true);

  const activeItems = currentWishlist.wishlistItems.filter((item: WishList) => item.isCompleted === false);

  function getStatus() {
    if (!params.isCompleted) return currentWishlist.wishlistItems;
    if (params.isCompleted === 'active') return activeItems;
    return completedItems;
  }

  const reorder = (list: any, startIndex: any, endIndex: any) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const handleOnDragEng = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.index === destination.index && source.droppableId === destination.droppableId) return;

    const reorderList = reorder(currentWishlist.wishlistItems, source.index, destination.index);
    let orderedList: any = [];
    reorderList.forEach((item, index) => {
      item.position = index;
      orderedList.push(item);
    });
    updateWishlist(currentWishlist._id, { wishlistItems: orderedList });
  };

  const [itemsLength, setItemsLength] = useState(0);
  const filteredActive = currentWishlist.wishlistItems.filter((item: any) => item.isCompleted === false);
  const filteredCompleted = currentWishlist.wishlistItems.filter((item: any) => item.isCompleted === true);

  useEffect(() => {
    if (params.isCompleted === 'active') {
      setItemsLength(filteredActive.length);
    } else if (params.isCompleted === 'completed') {
      setItemsLength(filteredCompleted.length);
    } else {
      setItemsLength(currentWishlist.wishlistItems.length);
    }
    return () => {};
  }, [currentWishlist.wishlistItems, filteredActive, filteredCompleted, params]);

  return (
    <DragDropContext onDragEnd={(result: any) => handleOnDragEng(result)}>
      <section className="wishlist-component">
        <div className="wishlist-component__home-link">
          <Link to={'/'}>
            <ArrowLeftOutlined />
          </Link>
        </div>
        <div className="wishlist-component__top-bar">
          <div className="wishlist-component__top-bar--wishlist-title">
            <h2
              style={{
                color: currentWishlist.color,
                backgroundColor: currentWishlist.backgroundColor,
              }}
            >
              {currentWishlist.wishlistName}
            </h2>
          </div>
          <div className="wishlist-component__top-bar--select-status">
            {currentWishlist.wishlistItems.length > 0 && (
              <>
                <Select
                  defaultValue=""
                  style={{ width: 120 }}
                  onChange={(e) => {
                    if (e === 'active') {
                      setItemsLength(filteredActive.length);
                    } else if (e === 'completed') {
                      setItemsLength(filteredCompleted.length);
                    } else {
                      setItemsLength(currentWishlist.wishlistItems.length);
                    }
                    navigate(`/wishlist/${e}`);
                  }}
                  options={[
                    { value: '', label: translate('selectStatusAll') },
                    { value: 'active', label: translate('selectStatusActive') },
                    { value: 'completed', label: translate('selectStatusComplete') },
                  ]}
                />
                <Badge
                  style={{
                    position: 'absolute',
                    top: 6,
                    right: 7,
                    color: colorPrimary,
                    backgroundColor: colorPrimaryBg,
                  }}
                  count={itemsLength}
                />
              </>
            )}
          </div>
        </div>
        {isLoading ? (
          <div className="wishlist-component__spinner">
            <Spinner />
          </div>
        ) : (
          <>
            <div className="wishlist-component__empty-list-msg">
              {getStatus().length === 0 && <div>{translate('emptyMessage')}...</div>}
            </div>
            <Droppable droppableId="wishlist-cards" direction="vertical">
              {(droppableProvided) => (
                <div
                  ref={droppableProvided.innerRef}
                  {...droppableProvided.droppableProps}
                  className="wishlist-component__list"
                >
                  {getStatus().map((wishlistItem: any) => (
                    <Draggable
                      key={wishlistItem.position}
                      draggableId={wishlistItem.position.toString()}
                      index={wishlistItem.position}
                    >
                      {(draggableProvided) => (
                        <span
                          {...draggableProvided.draggableProps}
                          ref={draggableProvided.innerRef}
                          {...draggableProvided.dragHandleProps}
                        >
                          <WishlistItem key={wishlistItem.id} wishlistItem={wishlistItem} />
                        </span>
                      )}
                    </Draggable>
                  ))}
                  {droppableProvided.placeholder}
                </div>
              )}
            </Droppable>

            {params.isCompleted !== 'completed' && <PostNewItem />}
          </>
        )}
      </section>
    </DragDropContext>
  );
}
