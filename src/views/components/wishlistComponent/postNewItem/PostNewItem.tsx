import { useState, useContext } from 'react';
import WishlistContext from 'context/wishlist/WishlistContext';
import ThemeContext from 'context/theme/ThemeContext';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import { Button, Input, Space } from 'antd';
import './postNewItem.scss';

export default function PostNewItem() {
  const { addNewWishlistItem } = useContext(WishlistContext);
  const [inputs, setInputs] = useState({ title: '' });
  const { t: translate } = useTranslation();
  const { currentThemeColor } = useContext(ThemeContext);
  const { colorPrimary, colorPrimaryBg } = currentThemeColor;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!inputs.title) return toast.error('¡Escribe algo!');
    addNewWishlistItem(inputs);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    setInputs({
      ...inputs,
      title: '',
    });
  };

  const handleChangeForm = (e: any) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  return (
    <article className="post-new-item-form">
      <Space.Compact style={{ width: 500, height: 45 }}>
        <Input
          size="large"
          name="title"
          placeholder={translate('postNotePlaceholder') || ''}
          value={inputs.title}
          onChange={(e) => handleChangeForm(e)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit(e);
          }}
        />
        <Button
          onClick={(e) => handleSubmit(e)}
          style={{ backgroundColor: colorPrimaryBg, color: colorPrimary, height: 'auto', fontWeight: 600 }}
          type="primary"
        >
          {translate('postNoteButton')}
        </Button>
      </Space.Compact>
    </article>
  );
}
