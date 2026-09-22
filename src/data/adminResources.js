/**
 * Each entry describes one CMS resource for the generic admin
 * ResourceManager: which API path to call, which columns to show in
 * the list table, and which fields to render in the create/edit form.
 *
 * Field types: text | textarea | checkbox | number | select | list
 * ("list" fields are edited as one item per line and stored as an
 * array of strings — used for things like requiredShipmentInfo).
 */
export const ADMIN_RESOURCES = {
  services: {
    label: 'Services',
    apiPath: 'services',
    columns: [
      { key: 'title', label: 'Title' },
      { key: 'category', label: 'Category' },
      { key: 'isPublished', label: 'Published' },
    ],
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'slug', label: 'Slug', type: 'text', required: true },
      {
        key: 'category', label: 'Category', type: 'select', required: true,
        options: ['air', 'ocean', 'multimodal', 'inland_customs', 'project', 'fashion', 'goh', 'warehousing', 'cfs', 'vas'],
      },
      { key: 'heroTagline', label: 'Hero Tagline', type: 'text' },
      { key: 'heroHeadline', label: 'Hero Headline', type: 'text' },
      { key: 'problemStatement', label: 'Problem Statement', type: 'textarea' },
      { key: 'solutionSummary', label: 'Solution Summary', type: 'textarea' },
      { key: 'whenToUse', label: 'When To Use', type: 'textarea' },
      { key: 'requiredShipmentInfo', label: 'Required Shipment Info (one per line)', type: 'list' },
      { key: 'capabilities', label: 'Capabilities (one per line)', type: 'list' },
      { key: 'benefits', label: 'Benefits (one per line)', type: 'list' },
      { key: 'evidence', label: 'Evidence (one per line)', type: 'list' },
      { key: 'order', label: 'Sort Order', type: 'number' },
      { key: 'isPublished', label: 'Published', type: 'checkbox' },
    ],
  },

  industries: {
    label: 'Industries',
    apiPath: 'industries',
    columns: [
      { key: 'title', label: 'Title' },
      { key: 'isPublished', label: 'Published' },
    ],
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'slug', label: 'Slug', type: 'text', required: true },
      { key: 'summary', label: 'Summary', type: 'textarea' },
      { key: 'heroHeadline', label: 'Hero Headline', type: 'text' },
      { key: 'considerations', label: 'Considerations (one per line)', type: 'list' },
      { key: 'order', label: 'Sort Order', type: 'number' },
      { key: 'isPublished', label: 'Published', type: 'checkbox' },
    ],
  },

  locations: {
    label: 'Network Locations',
    apiPath: 'locations',
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'relationship', label: 'Relationship' },
      { key: 'isVerified', label: 'Verified' },
      { key: 'isPublished', label: 'Published' },
    ],
    fields: [
      { key: 'name', label: 'Name', type: 'text', required: true },
      { key: 'country', label: 'Country', type: 'text', required: true },
      { key: 'city', label: 'City', type: 'text' },
      {
        key: 'relationship', label: 'Relationship', type: 'select', required: true,
        options: ['crystal_office', 'joint_venture', 'regional_group_operation', 'network_partner'],
      },
      { key: 'address', label: 'Address', type: 'textarea' },
      { key: 'servicesOffered', label: 'Services Offered (one per line)', type: 'list' },
      { key: 'isVerified', label: 'Verified', type: 'checkbox' },
      { key: 'isPublished', label: 'Published', type: 'checkbox' },
    ],
  },

  'case-studies': {
    label: 'Case Studies',
    apiPath: 'case-studies',
    columns: [
      { key: 'title', label: 'Title' },
      { key: 'category', label: 'Category' },
      { key: 'customerPermissionGranted', label: 'Permission' },
      { key: 'isPublished', label: 'Published' },
    ],
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'slug', label: 'Slug', type: 'text', required: true },
      { key: 'category', label: 'Category', type: 'text' },
      { key: 'requirement', label: 'Requirement', type: 'textarea' },
      { key: 'routeDecision', label: 'Route Decision', type: 'textarea' },
      { key: 'execution', label: 'Execution', type: 'textarea' },
      { key: 'approvedOutcome', label: 'Approved Outcome', type: 'textarea' },
      { key: 'customerName', label: 'Customer Name', type: 'text' },
      { key: 'testimonial', label: 'Testimonial', type: 'textarea' },
      { key: 'customerPermissionGranted', label: 'Customer Permission Granted', type: 'checkbox' },
      { key: 'isPublished', label: 'Published', type: 'checkbox' },
    ],
  },

  insights: {
    label: 'Insights',
    apiPath: 'insights',
    columns: [
      { key: 'title', label: 'Title' },
      { key: 'category', label: 'Category' },
      { key: 'editorialApprovalStatus', label: 'Approval' },
      { key: 'isPublished', label: 'Published' },
    ],
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'slug', label: 'Slug', type: 'text', required: true },
      {
        key: 'category', label: 'Category', type: 'select', required: true,
        options: ['bangladesh_gateway', 'air_ocean_market', 'multimodal_routing', 'fashion_consolidation'],
      },
      { key: 'excerpt', label: 'Excerpt', type: 'textarea' },
      { key: 'body', label: 'Body', type: 'textarea' },
      {
        key: 'editorialApprovalStatus', label: 'Editorial Approval', type: 'select',
        options: ['pending', 'approved', 'rejected'],
      },
      { key: 'isPublished', label: 'Published', type: 'checkbox' },
    ],
  },

  jobs: {
    label: 'Careers / Jobs',
    apiPath: 'jobs',
    columns: [
      { key: 'title', label: 'Title' },
      { key: 'location', label: 'Location' },
      { key: 'isOpen', label: 'Open' },
      { key: 'isPublished', label: 'Published' },
    ],
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'slug', label: 'Slug', type: 'text', required: true },
      { key: 'department', label: 'Department', type: 'text' },
      { key: 'location', label: 'Location', type: 'text' },
      {
        key: 'employmentType', label: 'Employment Type', type: 'select',
        options: ['full_time', 'part_time', 'contract', 'internship'],
      },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'responsibilities', label: 'Responsibilities (one per line)', type: 'list' },
      { key: 'requirements', label: 'Requirements (one per line)', type: 'list' },
      { key: 'isOpen', label: 'Open', type: 'checkbox' },
      { key: 'isPublished', label: 'Published', type: 'checkbox' },
    ],
  },
};
