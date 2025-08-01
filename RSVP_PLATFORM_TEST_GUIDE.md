# RSVP Platform Compliance - Testing Guide

## Overview
This wedding template now fully complies with the RSVP platform contract. All RSVP UI and actions are driven by platform postMessages after initial load.

## Test URLs

### Base URL Structure
```
/invitation?guestName=John&eventId=123&guestId=456
```

### Platform Test Scenarios

#### 1. Normal Flow (Platform Driven)
```
/invitation?guestName=John&eventId=123&guestId=456&platformTest=normal
```
- Waits for `INVITATION_LOADED` message from platform
- Shows Accept button only when `showAcceptButton: true`
- Shows Submit/Edit buttons only when respective flags are true

#### 2. Missing IDs (Error State)
```
/invitation?guestName=John&platformTest=missingIds
```
- Shows fatal error message about missing eventId/guestId
- Does not allow RSVP actions

#### 3. Platform Timeout (Fallback)
```
/invitation?guestName=John&eventId=123&guestId=456&platformTest=timeout
```
- Waits 5 seconds for platform message
- Falls back to basic Accept button with timeout indicator

#### 4. Already Responded (URL-based)
```
/invitation?guestName=John&eventId=123&guestId=456&hasResponded=true&accepted=true
```
- Shows "Response Recorded" message
- Used for fallback only when platform times out

## Platform Message Examples

### 1. Initial Load with Accept Button
```javascript
window.postMessage({
  type: 'INVITATION_LOADED',
  source: 'parent-platform',
  data: {
    eventId: '123',
    guestId: '456',
    status: null,
    showAcceptButton: true,
    showSubmitButton: false,
    showEditButton: false,
    rsvpFields: [],
    existingRsvpData: null
  }
}, '*');
```

### 2. After Accept - Show Submit RSVP
```javascript
window.postMessage({
  type: 'RSVP_ACCEPTED_CONFIRM',
  source: 'parent-platform',
  data: {
    success: true,
    payload: {
      eventId: '123',
      guestId: '456',
      status: 'accepted',
      showAcceptButton: false,
      showSubmitButton: true,
      showEditButton: false,
      rsvpFields: [
        { name: 'guests', label: 'Number of Guests', type: 'number', required: true },
        { name: 'dietary', label: 'Dietary Requirements', type: 'textarea', required: false }
      ],
      existingRsvpData: null,
      confirmationText: 'Thank you for accepting! Please provide additional details.'
    }
  }
}, '*');
```

### 3. After Submit - Show Edit Option
```javascript
window.postMessage({
  type: 'RSVP_SUBMITTED_CONFIRM',
  source: 'parent-platform',
  data: {
    success: true,
    payload: {
      eventId: '123',
      guestId: '456',
      status: 'submitted',
      showAcceptButton: false,
      showSubmitButton: false,
      showEditButton: true,
      rsvpFields: [
        { name: 'guests', label: 'Number of Guests', type: 'number', required: true },
        { name: 'dietary', label: 'Dietary Requirements', type: 'textarea', required: false }
      ],
      existingRsvpData: { guests: '2', dietary: 'Vegetarian' },
      confirmationText: 'RSVP submitted successfully! You can edit your response below.'
    }
  }
}, '*');
```

## Expected Outbound Messages

The template will send these messages to the platform:

### 1. RSVP_ACCEPTED
```javascript
{
  type: 'RSVP_ACCEPTED',
  data: {
    guestName: 'John',
    guestId: '456',
    eventId: '123',
    timestamp: '2024-01-01T12:00:00.000Z'
  },
  source: 'wedding-invitation'
}
```

### 2. RSVP_SUBMITTED
```javascript
{
  type: 'RSVP_SUBMITTED',
  data: {
    rsvpData: { guests: '2', dietary: 'Vegetarian' },
    guestName: 'John',
    guestId: '456',
    eventId: '123',
    timestamp: '2024-01-01T12:00:00.000Z'
  },
  source: 'wedding-invitation'
}
```

### 3. RSVP_UPDATED
```javascript
{
  type: 'RSVP_UPDATED',
  data: {
    rsvpData: { guests: '3', dietary: 'Vegan' },
    guestName: 'John',
    guestId: '456',
    eventId: '123',
    timestamp: '2024-01-01T12:00:00.000Z'
  },
  source: 'wedding-invitation'
}
```

## Supported RSVP Field Types

- `text`: Standard text input
- `number`: Numeric input
- `textarea`: Multi-line text area
- `select`: Dropdown with options array

Unknown field types will show dev mode warning and be skipped.

## Key Behavioral Changes

1. **No Local RSVP State**: All UI is driven by platform payload
2. **5-Second Timeout**: Falls back to basic mode if no platform message
3. **Required IDs**: eventId and guestId must be present for platform compliance
4. **Bidirectional Flow**: Template sends action → Platform confirms → UI updates
5. **Form Integration**: Dynamic RSVP form with edit capabilities
6. **Error Handling**: Comprehensive validation and fallbacks

## Testing Checklist

- [ ] Accept invitation sends correct message with IDs
- [ ] Submit RSVP shows form with platform fields
- [ ] Edit RSVP pre-fills existing data
- [ ] Platform timeout shows fallback UI
- [ ] Missing IDs show error state
- [ ] All outbound messages include required fields
- [ ] UI updates only from platform confirmations
- [ ] Form validation works correctly
- [ ] Cancel button returns to thank you state
- [ ] Analytics tracking continues working