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
        {
          id: "uuid1",
          field_name: "guests",
          field_label: "Number of Guests",
          field_type: "number",
          is_required: true,
          display_order: 1
        },
        {
          id: "uuid2", 
          field_name: "dietary",
          field_label: "Dietary Requirements",
          field_type: "textarea",
          is_required: false,
          display_order: 2
        }
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
        {
          id: "uuid1",
          field_name: "guests",
          field_label: "Number of Guests", 
          field_type: "number",
          is_required: true,
          display_order: 1
        },
        {
          id: "uuid2",
          field_name: "dietary",
          field_label: "Dietary Requirements",
          field_type: "textarea", 
          is_required: false,
          display_order: 2
        }
      ],
      existingRsvpData: { guests: '2', dietary: 'Vegetarian' },
      confirmationText: 'RSVP submitted successfully! You can edit your response below.'
    }
  }
}, '*');
```

## Expected Outbound Messages

The template will send these messages to the platform:

### 1. RSVP_ACCEPTED (CORRECTED - Simplified)
```javascript
{
  type: 'RSVP_ACCEPTED',
  data: {
    eventId: '123',
    guestId: '456'
  },
  source: 'wedding-invitation'
}
```

### 2. RSVP_SUBMITTED (CORRECTED - Simplified)
```javascript
{
  type: 'RSVP_SUBMITTED',
  data: {
    eventId: '123',
    guestId: '456',
    rsvpData: { guests: '2', dietary: 'Vegetarian' }
  },
  source: 'wedding-invitation'
}
```

### 3. RSVP_UPDATED (CORRECTED - Simplified)
```javascript
{
  type: 'RSVP_UPDATED',
  data: {
    eventId: '123',
    guestId: '456',
    rsvpData: { guests: '3', dietary: 'Vegan' }
  },
  source: 'wedding-invitation'
}
```

## Supported RSVP Field Types

- `text`: Standard text input  
- `email`: Email input
- `number`: Numeric input
- `textarea`: Multi-line text area
- `select`: Dropdown with options array
- `radio`: Radio button group
- `checkbox`: Checkbox input
- `date`: Date picker

Unknown field types will show dev mode warning and be skipped.

## Key Behavioral Changes

1. **CORRECTED Status Values**: `status` can be `null`, `'viewed'`, `'accepted'`, `'submitted'` (not `"pending"`)
2. **CORRECTED Button Logic**: `showAcceptButton` ONLY true when `status === null` (not for 'viewed')
3. **Simplified Message Structure**: Outbound messages contain only `eventId`, `guestId`, and `rsvpData` (no `guestName` or `timestamp`)
4. **Platform Field Structure**: Uses platform's exact field interface with `field_name`, `field_label`, etc.
5. **No Local RSVP State**: All UI is driven by platform payload
6. **5-Second Timeout**: Falls back to basic mode if no platform message
7. **Required IDs**: eventId and guestId must be present for platform compliance
8. **Bidirectional Flow**: Template sends action → Platform confirms → UI updates
9. **Form Integration**: Dynamic RSVP form with edit capabilities
10. **Error Handling**: Comprehensive validation and fallbacks

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