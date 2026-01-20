# Product Requirements Document (PRD)

## Project Name: Crayfish Dissection Mapping Application

## Version: 1.0 (Basic MVP)

## Project Overview

The Crayfish Dissection Mapping Application is a scientific data visualization tool designed to map and analyze crayfish dissection data collected from various locations in South Carolina. The application provides researchers with an interactive map interface to explore crayfish populations, infection rates, and demographic data across different collection sites and seasons.

---

## 1. Executive Summary

### Purpose
To create an interactive web-based mapping application that visualizes crayfish dissection data, enabling researchers to:
- Visualize collection locations and jar data spatially
- Filter data by season and infection types
- Navigate hierarchically from locations to individual jars
- Access detailed dissection statistics and infection data

### Target Users
- Biology researchers
- Ecology students
- Wildlife management professionals
- Academic researchers studying crayfish populations

### Key Features
- Interactive map with hierarchical navigation (locations → jars → details)
- Advanced filtering by season and infection types
- Real-time data visualization with detailed statistics
- Responsive design optimized for research environments

---

## 2. Technical Architecture

### Tech Stack

#### Frontend
- **Framework**: Next.js 14 with React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom utilities
- **Mapping**: React Leaflet with OpenStreetMap tiles
- **State Management**: React hooks (useState, useEffect, useMemo)
- **Build Tools**: Next.js built-in bundler, PostCSS, Autoprefixer

#### Backend/Database
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (not currently implemented)
- **API**: Supabase JavaScript client
- **Data Processing**: Node.js scripts for CSV import

#### Development Tools
- **Linting**: ESLint with Next.js configuration
- **Type Checking**: TypeScript
- **Package Management**: npm

### System Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Next.js App   │────│   Supabase API  │────│  PostgreSQL DB  │
│                 │    │                 │    │                 │
│ - React Components│   │ - RESTful API   │   │ - locations     │
│ - Leaflet Maps   │   │ - Real-time subs │   │ - jars          │
│ - TypeScript     │   │ - Auth (future)  │   │ - indexes       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

---

## 3. Functional Requirements

### Core Functionality

#### 3.1 Map View
- **Interactive Map**: Full-screen Leaflet map with OpenStreetMap tiles
- **Hierarchical Navigation**:
  - **Location Level** (zoom < 11): Shows collection site markers
  - **Jar Level** (zoom ≥ 11): Shows individual jar markers
  - **Detail Level**: Opens side panel with jar statistics
- **Map Controls**: Standard Leaflet zoom/pan controls
- **Bounds Constraints**: Limited to South Carolina region (32-36°N, 78-84°W)

#### 3.2 Location Markers
- **Visual Design**: Custom Leaflet markers with cluster information
- **Interaction**: Click to zoom into jar-level view
- **Data Display**: Shows number of jars at each location
- **Clustering**: Automatically groups nearby locations when zoomed out

#### 3.3 Jar Markers
- **Visual Design**: Individual markers with infection status indicators
- **Interaction**: Click to center map and open detail panel
- **Marker Offsetting**: Automatically offsets overlapping markers
- **Selection States**: Visual indication of selected jar

#### 3.4 Navigation Controls
- **Top Bar**: Fixed navigation bar with controls
- **Back Button**: Navigate to previous view state
- **Reset Button**: Return to default map view
- **Jar Navigator**: Previous/Next buttons for jar navigation within a location
- **Breadcrumb Context**: Shows current location and jar information

#### 3.5 Filtering System
- **Season Filter**: Spring, Summer, Fall, Winter (derived from collection date)
- **Infection Filters**:
  - BD (Bacterial Disease)
  - MC-L (Microsporidia Large)
  - MC-S (Microsporidia Small)
  - Acanthocephala
- **Real-time Filtering**: Updates map markers and data immediately
- **Filter Persistence**: Maintains filter state during navigation

#### 3.6 Data Detail Panel
- **Slide-out Panel**: Right-side panel with jar details
- **Information Display**:
  - Location name and coordinates
  - Jar code (specimen identifier)
  - Collection date and season
  - Total crayfish count
  - Sex distribution (males/females)
  - Infection statistics for each type
- **Panel Controls**: Close button and auto-close on zoom out

### Data Processing

#### 3.7 CSV Import System
- **Input Format**: CSV with specimen-level data
- **Data Aggregation**: Groups specimens into jars by location/date
- **Validation**: Coordinate validation for South Carolina region
- **Data Cleaning**: Handles missing values and data inconsistencies
- **SQL Generation**: Creates import scripts for Supabase

---

## 4. Data Model

### Database Schema

#### locations Table
| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| name | TEXT | NOT NULL | Human-readable location name |
| lat | FLOAT | NOT NULL | Latitude coordinate |
| lon | FLOAT | NOT NULL | Longitude coordinate |
| created_at | TIMESTAMP | DEFAULT NOW() | Creation timestamp |
| updated_at | TIMESTAMP | DEFAULT NOW() | Last update timestamp |

#### jars Table
| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| jar_code | TEXT | UNIQUE, NOT NULL | Specimen identifier (e.g., "CT68_81") |
| location_id | UUID | FK → locations.id | Associated location |
| lat | FLOAT | NOT NULL | Latitude coordinate |
| lon | FLOAT | NOT NULL | Longitude coordinate |
| collection_date | DATE | NOT NULL | Collection date |
| total_crayfish | INT | NOT NULL, DEFAULT 0 | Total specimens |
| num_males | INT | NOT NULL, DEFAULT 0 | Male crayfish count |
| num_females | INT | NOT NULL, DEFAULT 0 | Female crayfish count |
| infected_bd | INT | NOT NULL, DEFAULT 0 | BD infection count |
| infected_mc_l | INT | NOT NULL, DEFAULT 0 | Large microsporidia count |
| infected_mc_s | INT | NOT NULL, DEFAULT 0 | Small microsporidia count |
| infected_acanth | INT | NOT NULL, DEFAULT 0 | Acanthocephala count |
| created_at | TIMESTAMP | DEFAULT NOW() | Creation timestamp |
| updated_at | TIMESTAMP | DEFAULT NOW() | Last update timestamp |

### Data Relationships
- **One-to-Many**: locations → jars (one location can have multiple jars)
- **Indexing**: Optimized indexes on coordinates, dates, and foreign keys
- **Data Integrity**: Foreign key constraints and automatic timestamps

---

## 5. User Experience Requirements

### 5.1 Interface Design
- **Clean, Scientific Aesthetic**: Professional appearance suitable for research
- **Responsive Layout**: Optimized for desktop research workstations
- **Accessibility**: Proper ARIA labels and keyboard navigation support
- **Loading States**: Clear feedback during data loading and map initialization

### 5.2 Navigation Flow
```
Default View (State Map)
    ↓ Click Location Marker
Location Detail View (Zoomed Map + Jar Markers)
    ↓ Click Jar Marker
Jar Detail View (Centered Map + Side Panel)
    ↓ Click Back/Navigate
← Previous Views
```

### 5.3 Performance Expectations
- **Initial Load**: < 3 seconds for map and data loading
- **Map Interactions**: Smooth pan/zoom with 60fps
- **Filter Updates**: < 500ms for filter application
- **Data Queries**: Efficient database queries with proper indexing

---

## 6. Technical Requirements

### 6.1 Performance Requirements
- **Scalability**: Support for thousands of jars without performance degradation
- **Memory Management**: Efficient marker rendering and cleanup
- **Network Optimization**: Cached map tiles and optimized API calls
- **Browser Compatibility**: Modern browsers (Chrome, Firefox, Safari, Edge)

### 6.2 Security Requirements
- **Data Protection**: Secure database access through Supabase
- **Input Validation**: Client and server-side validation
- **Error Handling**: Graceful failure handling without data exposure
- **Future Auth**: Prepared for user authentication and authorization

### 6.3 Deployment Requirements
- **Hosting**: Vercel or similar Next.js-compatible platform
- **Database**: Supabase cloud hosting
- **CI/CD**: Automated deployment pipelines
- **Monitoring**: Error tracking and performance monitoring

---

## 7. Implementation Details

### 7.1 Component Architecture
```
MapView (Main Container)
├── TopBar (Navigation)
├── FilterPanel (Filtering)
├── MapContainer (Leaflet Map)
│   ├── LocationMarker (Location markers)
│   └── JarMarker (Jar markers)
└── JarDetailPanel (Detail sidebar)
```

### 7.2 State Management
- **Local State**: React hooks for UI state
- **Server State**: Supabase client for data fetching
- **Navigation State**: History-based navigation system
- **Filter State**: Persistent filter configuration

### 7.3 Data Processing Pipeline
1. **CSV Import**: Raw specimen data processing
2. **Data Aggregation**: Group specimens into jars
3. **Location Creation**: Generate location records
4. **Database Import**: Bulk insert with conflict resolution
5. **Index Optimization**: Database performance tuning

---

## 8. Future Enhancements (Not in MVP)

### Phase 2 Features
- User authentication and data access controls
- Data export functionality (CSV, JSON)
- Advanced analytics and charting
- Mobile-responsive design
- Offline data caching
- Real-time collaboration features
- API endpoints for external integrations

### Technical Improvements
- GraphQL API implementation
- Advanced caching strategies
- Progressive Web App (PWA) features
- Automated testing suite
- Performance monitoring and analytics

---

## 9. Success Metrics

### User Experience Metrics
- **Load Time**: < 3 seconds initial page load
- **Interaction Responsiveness**: < 100ms for UI interactions
- **Data Accuracy**: 100% accurate data display
- **Navigation Efficiency**: Intuitive hierarchical navigation

### Technical Metrics
- **Performance**: Smooth 60fps map interactions
- **Scalability**: Support 10,000+ data points
- **Reliability**: 99.9% uptime
- **Maintainability**: Well-documented, typed codebase

---

## 10. Appendices

### 10.1 Data Source Format
CSV columns: Spec#, Date_Coll, Tag#, Sex, Length, BD_Count, Large_Count, Small_Count, Acanth_Count, Latitude, Longitude

### 10.2 Coordinate System
- **Projection**: WGS84 (EPSG:4326)
- **Bounds**: South Carolina region (32°-36°N, 78°-84°W)
- **Precision**: 5 decimal places for coordinates

### 10.3 Infection Type Definitions
- **BD**: Bacterial Disease
- **MC-L**: Microsporidia (Large spores)
- **MC-S**: Microsporidia (Small spores)
- **Acanth**: Acanthocephala parasites

This PRD serves as the comprehensive specification for the Crayfish Dissection Mapping Application, providing all necessary information for development, deployment, and future maintenance.

