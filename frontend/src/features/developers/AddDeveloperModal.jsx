import React, { useState } from 'react';
import { Modal } from '../../components/common/Modal';
import { developerService } from '../../api/developerService';

export const AddDeveloperModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({ name: '', title: '', experience: 0, github: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await developerService.create(formData);
      onSuccess();
      onClose();
      setFormData({ name: '', title: '', experience: 0, github: '' });
    } catch (err) {
      alert('Failed to add developer node');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Developer Node">
      <form onSubmit={handleSubmit} className="add-dev-form">
        <div className="form-group">
          <label>Name *</label>
          <input
            required
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Elena Rostova"
          />
        </div>
        <div className="form-group">
          <label>Title *</label>
          <input
            required
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Graph Systems Architect"
          />
        </div>
        <div className="form-group">
          <label>Years of Experience</label>
          <input
            type="number"
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: parseInt(e.target.value) || 0 })}
          />
        </div>
        <div className="form-group">
          <label>GitHub Handle</label>
          <input
            type="text"
            value={formData.github}
            onChange={(e) => setFormData({ ...formData, github: e.target.value })}
            placeholder="e.g. elena-graph"
          />
        </div>
        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={submitting}>
            {submitting ? 'Creating...' : 'Create Node'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
