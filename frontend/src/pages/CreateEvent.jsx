import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/CreateEvent.css';

function CreateEvent() {
    const [formData, setFormData] = useState({
        eventName: '',
        previewText: '',
        coverPhoto: null,
        description: '',
        actionButtonEnabled: false,
        actionButtonLabel: '',
        actionButtonLink: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        cost: '',
        venue: '',
        organizer1: '',
        organizer2: '',
        organizer3: '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        let val = value;
        if (type === 'checkbox') val = checked;
        if (type === 'file') val = files[0] || null;

        setFormData((prev) => ({
            ...prev,
            [name]: val,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // For now just log the payload; hook to API later
        // eslint-disable-next-line no-console
        console.log('CreateEvent payload:', formData);
        alert('Event form submitted (mock). Hook this up to your API when ready.');
    };

    return (
        <div className="create-event-page">
            <Header />

            <main className="create-event-main">
                <section className="create-event-container">
                    <h1 className="create-event-title">Create Event</h1>

                    <form className="create-event-form" onSubmit={handleSubmit}>
                        {/* Event Name */}
                        <div className="ce-field-group">
                            <label className="ce-label-large">
                                Event Name <span className="ce-required">*</span>
                            </label>
                            <input
                                type="text"
                                name="eventName"
                                value={formData.eventName}
                                onChange={handleChange}
                                className="ce-input"
                                placeholder="Enter event name"
                                required
                            />
                        </div>

                        {/* Preview Text */}
                        <div className="ce-field-group">
                            <label className="ce-label-large">
                                Preview Text <span className="ce-required">*</span>
                            </label>
                            <textarea
                                name="previewText"
                                value={formData.previewText}
                                onChange={handleChange}
                                className="ce-textarea ce-textarea-small"
                                placeholder="This text will appear in event cards and previews"
                                required
                            />
                        </div>

                        {/* Cover Photo */}
                        <div className="ce-field-group">
                            <label className="ce-label-large">
                                Cover Photo <span className="ce-required">*</span>
                            </label>
                            <label className="ce-file-input">
                                <span className="ce-file-placeholder">
                                    {formData.coverPhoto ? formData.coverPhoto.name : 'Upload Image'}
                                </span>
                                <span className="ce-file-icon" aria-hidden="true">
                                    ▢
                                </span>
                                <input
                                    type="file"
                                    name="coverPhoto"
                                    accept="image/*"
                                    onChange={handleChange}
                                    required={!formData.coverPhoto}
                                />
                            </label>
                        </div>

                        {/* Description */}
                        <div className="ce-field-group">
                            <label className="ce-label-large">
                                Description <span className="ce-required">*</span>
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="ce-textarea ce-textarea-large"
                                placeholder="Provide a detailed description of the event"
                                required
                            />
                        </div>

                        {/* Event Action Button Toggle */}
                        <div className="ce-section">
                            <div className="ce-toggle-row">
                                <div className="ce-toggle-text">
                                    <div className="ce-toggle-title">Event Action Button</div>
                                    <div className="ce-toggle-description">
                                        Display a custom button on the event page
                                    </div>
                                </div>
                                <label className="ce-toggle-switch">
                                    <input
                                        type="checkbox"
                                        name="actionButtonEnabled"
                                        checked={formData.actionButtonEnabled}
                                        onChange={handleChange}
                                    />
                                    <span className="ce-toggle-slider" />
                                </label>
                            </div>

                            {formData.actionButtonEnabled && (
                                <div className="ce-toggle-fields">
                                    <div className="ce-field-group ce-field-half">
                                        <label className="ce-label-small">Button Label</label>
                                        <input
                                            type="text"
                                            name="actionButtonLabel"
                                            value={formData.actionButtonLabel}
                                            onChange={handleChange}
                                            className="ce-input"
                                            placeholder="Enter button text"
                                        />
                                    </div>
                                    <div className="ce-field-group ce-field-half">
                                        <label className="ce-label-small">Button Link</label>
                                        <input
                                            type="url"
                                            name="actionButtonLink"
                                            value={formData.actionButtonLink}
                                            onChange={handleChange}
                                            className="ce-input"
                                            placeholder="https://example.com"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Date & Time rows */}
                        <div className="ce-row">
                            <div className="ce-field-group ce-field-half">
                                <label className="ce-label-small">
                                    Start Date <span className="ce-required">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    className="ce-input"
                                    placeholder="DD/MM/YYYY"
                                    required
                                />
                            </div>
                            <div className="ce-field-group ce-field-half">
                                <label className="ce-label-small">End Date</label>
                                <input
                                    type="text"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    className="ce-input"
                                    placeholder="DD/MM/YYYY"
                                />
                            </div>
                        </div>

                        <div className="ce-row">
                            <div className="ce-field-group ce-field-half">
                                <label className="ce-label-small">Start Time</label>
                                <input
                                    type="text"
                                    name="startTime"
                                    value={formData.startTime}
                                    onChange={handleChange}
                                    className="ce-input"
                                    placeholder="--:-- --"
                                />
                            </div>
                            <div className="ce-field-group ce-field-half">
                                <label className="ce-label-small">End Time</label>
                                <input
                                    type="text"
                                    name="endTime"
                                    value={formData.endTime}
                                    onChange={handleChange}
                                    className="ce-input"
                                    placeholder="--:-- --"
                                />
                            </div>
                        </div>

                        {/* Cost */}
                        <div className="ce-field-group ce-field-half">
                            <label className="ce-label-small">Cost</label>
                            <input
                                type="text"
                                name="cost"
                                value={formData.cost}
                                onChange={handleChange}
                                className="ce-input"
                                placeholder="Ex. 3000 pesos"
                            />
                        </div>

                        {/* Venue */}
                        <div className="ce-field-group">
                            <label className="ce-label-small">
                                Venue <span className="ce-required">*</span>
                            </label>
                            <input
                                type="text"
                                name="venue"
                                value={formData.venue}
                                onChange={handleChange}
                                className="ce-input"
                                placeholder="Enter event location"
                                required
                            />
                        </div>

                        {/* Organizers - three free-text fields */}
                        <div className="ce-field-group">
                            <label className="ce-label-small">Organizers</label>
                            <div className="ce-row ce-organizers-row">
                                <div className="ce-field-half">
                                    <input
                                        type="text"
                                        name="organizer1"
                                        value={formData.organizer1}
                                        onChange={handleChange}
                                        className="ce-input"
                                        placeholder="Ex. Thor Hanson, PhD (BS '64)"
                                    />
                                </div>
                                <div className="ce-field-half">
                                    <input
                                        type="text"
                                        name="organizer2"
                                        value={formData.organizer2}
                                        onChange={handleChange}
                                        className="ce-input"
                                        placeholder="Add another organizer"
                                    />
                                </div>
                                <div className="ce-field-half">
                                    <input
                                        type="text"
                                        name="organizer3"
                                        value={formData.organizer3}
                                        onChange={handleChange}
                                        className="ce-input"
                                        placeholder="Add another organizer"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit button */}
                        <div className="ce-actions">
                            <button type="submit" className="ce-submit-btn">
                                <span>Post Event</span>
                                <span className="ce-submit-icon" aria-hidden="true">
                                    ➜
                                </span>
                            </button>
                        </div>
                    </form>
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default CreateEvent;

