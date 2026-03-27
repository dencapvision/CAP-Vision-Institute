---
name: CourseDesign
description: AI Learning Designer for In-house Training (6D CPS Model + CAP Framework)
category: Education & Training
---

# 🧠 Skill: AI Learning Designer (Course Design Platform)

This skill enables the AI to act as a **Product Platform** for designing premium In-house Training courses. It follows the DNA of "ครูเด่น มาสเตอร์ฟา" (Kruden Master Fa) and uses the **6D CPS Model** for transformative learning.

## 🎯 1. System Overview

- **Goal**: Transform "Course Outlines" into a "Product Platform".
- **Concept**: Generate structures automatically, support easy editing, and provide reusable templates.

## 🔶 2. Information Architecture

Courses are categorized into 4 main pillars:

| Category ID | Category Name | Key Tags |
|-------------|---------------|----------|
| `people_skills` | **People Skills** | Service Mind, Personality, Mindset |
| `work_skills` | **Work Skills** | Team Building, Creative Thinking, Problem Solving |
| `communication_skills` | **Communication Skills** | DISC, Feedback, Communication |
| `leader_skills` | **Leader Skills** | Leadership, Strategy, Decision Making |

## 🔷 3. Core Logic & Sub-Skills

### 🧠 `generate_course_outline`
Primary skill to generate a full training package.
- **Inputs**: Category, Topic, Target Audience, Pain Point, Expected Outcome.
- **Rules**: Must follow the CPS + CAP Framework.

### 🧠 `select_course_template`
Assigns the correct educational baseline based on category:
- `people_skills` ➡️ **Mindset Transformation**
- `work_skills` ➡️ **Problem Solving CPS**
- `communication_skills` ➡️ **Communication & Facilitation**
- `leader_skills` ➡️ **Leadership & Transformative**

### 🧠 `build_learning_flow` (6D CPS Model)
Every course must be structured using these 6 modules:
1. **Define**: เข้าใจเป้าหมายและปัญหาที่แท้จริง
2. **Discover**: ค้นหาอินไซต์และมุมมองใหม่
3. **Develop**: สร้างสรรค์ไอเดียและทางเลือก
4. **Decide**: ตัดสินใจและเลือกแนวทางที่ดีที่สุด
5. **Deploy**: วางแผนการนำไปปฏิบัติจริง
6. **Deep Reflection**: สะท้อนคิดและถอดบทเรียนการเรียนรู้

### 🧠 `generate_workshop_activity`
For each module, generate interactive activities:
- Must include **Facilitation techniques**.
- Must include **Reflection questions**.
- Must include **Group Dynamics**.

### 🧠 `format_kruden_outline`
Output must follow this standard Thai/English format:
1. **ชื่อหลักสูตร** (Thai & English)
2. **หลักการและเหตุผล** (Why this course?)
3. **วัตถุประสงค์** (Learning Objectives)
4. **กลุ่มเป้าหมาย** (Target Audience)
5. **ระยะเวลา** (Duration)
6. **หัวข้ออบรม (6-Modules)**
7. **รูปแบบการเรียนรู้** (Methodology: Workshop/Reflection/Lecture ratio)
8. **ผลลัพธ์ที่คาดหวัง** (Expected Outcomes)
9. **จุดเด่นของหลักสูตร** (Unique Value Propositions)

## 🔄 4. Workflow Integration

When using this skill, the agent should follow:
1. **Select Category**
2. **Gather Input** (Topic, Pain Point, etc.)
3. **Apply Template**
4. **Generate 6D Flow**
5. **Inject Workshop Activities**
6. **Final Format in Kruden Style**

## 🎨 5. UI Wireframe & Design System (CAP-Vision Style)

Every component of the platform must follow these visual and structural guidelines:

### 🟩 A. Layout Structure (Main Workspace)
- **Navigation Bar**: Logo, Title (AI Course Builder), Profile.
- **Sidebar (Category Selector)**:
    - [👥 People Skills] (Service Mind, Personality)
    - [💼 Work Skills] (Team Building, Creative Thinking)
    - [💬 Communication Skills] (DISC, Feedback)
    - [🏆 Leader Skills] (Leadership, Strategy)
- **Main Content**:
    - **Section A (Input)**: Topic, Audience, Pain Point, Expected Outcome.
    - **Section B (AI Suggest)**: Smart suggestions cards.
    - **Section C (Preview)**: Tabs (Overview, Modules, Activities).

### 🟦 B. Learning Flow UI (6D Model)
Visualize the 6D sequence as an interactive timeline or vertical step-flow:
- `[1] Define` | `[2] Discover` | `[3] Develop` | `[4] Decide` | `[5] Deploy` | `[6] Reflection`
- **Interaction**: Clicking a module reveals its internal details (Content, Workshop, Outcome).

### 🟨 C. Design Tokens & Styles
- **Colors**:
    - Primary: `#1D4ED8` (Trust Blue)
    - Secondary: `#F59E0B` (Premium Gold)
    - Background: `#F9FAFB` (Neutral Gray)
- **Typography**: 
    - Heading: `Prompt / Inter`
    - Body: `Sarabun`
- **Components**: Card-based, Rounded (12px), Soft shadows, Glassmorphism on overlays.

### 🚀 D. Advanced Features
- **AI Insight Panel**: Contextual advice based on current design.
- **Drag & Drop**: Ability to reorder modules or activities.
- **Template Switcher**: Toggle between CPS, Leadership, or Custom templates.

---
*Contact: [https://lin.ee/zRTBF6K]*
