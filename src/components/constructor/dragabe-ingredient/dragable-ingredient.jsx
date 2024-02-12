import React from 'react';
import styles from './dragable-ingredient.module.css';
import { useDrag, useDrop } from 'react-dnd';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { delIngredient } from '../../../services/actions/constructor-actions';
import { useDispatch } from 'react-redux';
import { movingFillings } from '../../../services/actions/constructor-actions';


function DragableIngredient({ ingredient, index }) {

  const dispatch = useDispatch();

  const [{ isDrag, sourceIng }, dragRef] = useDrag({
    type: "ingredient",
    item: {ingredient, index},
    collect: monitor => ({
      isDrag: monitor.isDragging(),
      sourceIng: monitor.getItem()
    })
  })
  const dragItemBorder = isDrag ? 'lightgreen' : 'transparent';

  const [{ isHoverIng }, dropRef] = useDrop({
    accept: "ingredient",
    collect: monitor => ({
      isHoverIng: monitor.isOver(),
    }),
    drop() {
      if (sourceIng.index !== index) {
        dispatch(movingFillings(sourceIng.index, index));
      }
    }
  });
  const hoverItemBorder = isHoverIng ? 'lightblue' : 'transparent';

  const handleDelIngredient = (ingredient, index) => {
    dispatch(delIngredient(ingredient, index));
  }

  return (
    <div className={styles.drop_layer} ref={dropRef} style={{borderColor: dragItemBorder}}>
      <div className={`${styles.drag_container} ml-4 mr-2`} style={{borderColor: hoverItemBorder}} ref={dragRef}  >
        <ConstructorElement
          text={`${ingredient.name}`}
          price={ingredient.price}
          thumbnail={ingredient.image}
          handleClose={() => handleDelIngredient(ingredient, index)}
        />
        <DragIcon type="primary" />
      </div>
    </div>
  );
}

export default DragableIngredient;
