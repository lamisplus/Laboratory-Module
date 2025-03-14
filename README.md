# Laboratory Module
## Description
The **Laboratory Module** is a vital component of the **LAMISPlus** system, tailored to support laboratory services in resource-limited settings. It provides tools for ordering, processing, and tracking diagnostic tests, managing inventory, and generating reports required for public health programs. By automating laboratory workflows and ensuring real-time access to test results, this module enhances the quality of care and supports adherence to national and international guidelines.

## Key Features

- **Test Ordering**: Facilitate the ordering of diagnostic tests directly from patient records.
- **Sample Management**: Track sample collection, labeling, transportation, and status updates.
- **Result Entry & Validation**: Record test results manually or import them from connected devices; validate results for accuracy.
- **Reporting & Analytics**: Generate reports on test volumes, turnaround times, and quality metrics; comply with PEPFAR, WHO, and other reporting standards.
- **Integration with Other Modules**: Link laboratory results to patient records in other modules for holistic care.
- **Quality Assurance**: Track internal and external quality control processes; facilitate participation in proficiency testing programs.
- **Data Privacy & Security**: Ensure secure handling of sensitive patient data with role-based access control and encryption.

## System Requirements

### Prerequisites to Install
- IDE of choice (IntelliJ, Eclipse, etc.)
- Java 8+
- node.js
- React.js
## Run in Development Environment

### How to Install Dependencies
1. Install Java 8+
2. Install PostgreSQL 14+
3. Install node.js
4. Install React.js
5. Open the project in your IDE of choice.

### Update Configuration File
1. Update other Maven application properties as required.

### Run Build and Install Commands
1. Change the directory to `src`:
    ```bash
    cd src
    ```
2. Run Frontend Build Command:
    ```bash
    npm run build
    ```
3. Run Maven clean install:
    ```bash
    mvn clean install
    ```

## How to Package for Production Environment
1. Run Maven package command:
    ```bash
    mvn clean package
    ```

## Launch Packaged JAR File
1. Launch the JAR file:
    ```bash
    java -jar <path-to-jar-file>
    ```
2. Optionally, run with memory allocation:
    ```bash
    java -jar -Xms4096M -Xmx6144M <path-to-jar-file>
    ```

## Visit the Application
- Visit the application on a browser at the configured port:
    ```
    http://localhost:8080
    ```

## Access Swagger Documentation
- Visit the application at:
    ```
    http://localhost:8080/swagger-ui.html#/
    ```

## Access Application Logs
- Application logs can be accessed in the `application-debug` folder.

## Authors & Acknowledgments
### Main contributors
- Chukwuemeka Ilozue https://github.com/drjavanew
- Adegbite Mathew https://github.com/Mathew77
- Victor Ajor https://github.com/AJ-DataFI
- Abiodun Peter https://github.com/Asquarep
- Gboyegun Taiwo https://github.com/mechack2022
- Ugo Basil https://github.com/Ugo-Basil

### Special contributors
- Aniwange Tertese Amos https://github.com/aniwange33
- Stomzy https://github.com/stomzy
- Kennedy Kiru https://github.com/kenkirui
- Hafiz Mohammad https://github.com/Danmanu44
- Anana Aristotle https://github.com/legendaryA3


  



