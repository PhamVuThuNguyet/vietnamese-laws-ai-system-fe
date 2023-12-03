/* eslint-disable react-hooks/exhaustive-deps */
import Rate from 'antd/lib/rate';
import Space from 'antd/lib/space';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { IoClose } from 'react-icons/io5';
import { useOnClickOutside } from 'usehooks-ts';

import styles from './styles.module.scss';

import { sendFeedBack } from '@/lib/api/feedback';

type FeedbackModalProps = {
  onClose: () => void;
  data: Record<string, any>;
};

export default function FeedbackModal({ onClose, data }: FeedbackModalProps) {
  const ref = useRef(null);

  const [submitData, setSubmitData] = useState({
    user_email: '',
    response: '',
    rate: 5,
  });

  const handleChange = (e: Record<string, any>) => {
    setSubmitData({ ...submitData, [e.target.name]: e.target.value });
  };

  const handleSubmitFeedback = async () => {
    try {
      const submittedData = { ...submitData, ...data };

      await sendFeedBack(submittedData);
      toast.success('Gửi đánh giá thành công!');
      onClose();
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại sau!');
    }
  };

  useOnClickOutside(ref, () => {
    document.body.style.overflow = 'unset';
    onClose();
  });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content} ref={ref}>
        <div className={styles.heading}>
          <div className={styles['heading-title']}>Gửi đánh giá</div>
          <div className={styles['heading-button-control']}>
            <div className={styles['heading-button']} onClick={onClose}>
              <IoClose size={18} />
            </div>
          </div>
        </div>
        <div className={styles['section']}>
          <label>Nội dung:</label>
          <input disabled value={data.charter_title} />
        </div>
        <div className={styles['section']}>
          <label>Từ khóa:</label>
          <input disabled value={data.search_keyword} />
        </div>
        <div className={styles['section']}>
          <label>Email của bạn:</label>
          <input
            name='user_email'
            value={submitData.user_email}
            onChange={handleChange}
          />
        </div>
        <div className={styles['section']}>
          <label>Nội dung đánh giá:</label>
          <input
            name='response'
            value={submitData.response}
            onChange={handleChange}
          />
        </div>
        <div className={styles['section']}>
          <label>Đánh giá độ phù hợp của văn bản:</label>
          <Space>
            <Rate
              onChange={(rate) => setSubmitData({ ...submitData, rate })}
              value={submitData.rate}
            />
          </Space>
        </div>
        <button
          type='button'
          onClick={handleSubmitFeedback}
          className='primary text-no-wrap	float-right h-10 rounded-sm bg-blue-800 px-2 text-sm text-white	'
        >
          Gửi đánh giá
        </button>
      </div>
    </div>
  );
}
