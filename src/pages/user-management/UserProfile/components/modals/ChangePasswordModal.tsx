import { Input, message, Modal } from 'antd';
import { useState } from 'react';
import { updateUserProfile } from '@/services/user-profile';

interface Props {
  visible: boolean;
  userId: string;
  onClose?: () => void;
  onSuccess?: () => void;
}

export default function ChangePasswordModal({ visible, userId, onClose, onSuccess }: Props) {
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (newPassword.length < 8) {
      message.error('Password must be at least 8 characters long');
      return;
    }
    try {
      setLoading(true);
      await updateUserProfile({
        id: userId,
        password: newPassword,
      });
      message.success('Password changed successfully');
      setNewPassword('');
      onSuccess?.();
    } catch (error) {
      message.error('Failed to change password');
      console.error('Failed to change password:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setNewPassword('');
    onClose?.();
  };

  return (
    <Modal
      title="Change Password"
      open={visible}
      onOk={handleChangePassword}
      onCancel={handleCancel}
      confirmLoading={loading}
    >
      <div className="py-4">
        <label className="block text-sm font-medium text-[#202B4B] mb-2">
          New Temporary Password
        </label>
        <Input.Password
          placeholder="Enter new password (min 8 characters)"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <p className="text-xs text-[#8C8C8C] mt-2">
          The user will be required to change this password on next login.
        </p>
      </div>
    </Modal>
  );
}
