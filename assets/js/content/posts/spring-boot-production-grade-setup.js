POSTS.push({
    slug: "spring-boot-project-foundation",
    title: "Spring Boot Project Foundation: From Spring Initializr to a Clean Development Setup",
    date: "September 5, 2026",
    summary: "Build a clean Spring Boot project foundation from Spring Initializr with Maven, Java 21, externalized configuration, Checkstyle, Spotless, dependency security, testing, and Git conventions.",
    featured: true,
    body: `<p>
    A Spring Boot project can be generated in a few seconds, but generating a project
    and building a maintainable project are two different things.
</p>

<p>
    In this guide, we will start from Spring Initializr and build the foundation step
    by step. We will keep the project intentionally simple and introduce each tool only
    when it has a clear purpose.
</p>

<p>
    The goal of this phase is not to add every tool commonly seen in production
    projects. The goal is to create a clean development foundation that is easy to
    understand, maintain, test, and maintain.
</p>

<h2>What We Will Build</h2>

<p>
    By the end of this phase, the project will have:
</p>

<ul>
    <li>Java 21</li>
    <li>Spring Boot 4.1.1</li>
    <li>Maven and Maven Wrapper</li>
    <li>Clean application configuration</li>
    <li>Externalized configuration support</li>
    <li>Secret protection</li>
    <li>Git ignore rules</li>
    <li>Checkstyle</li>
    <li>Spotless formatting</li>
    <li>Dependency vulnerability scanning</li>
    <li>Basic automated testing</li>
    <li>Simple Git conventions</li>
</ul>

<p>
    Some commonly used tools are deliberately not added. We will explain why as we
    progress.
</p>

<h2>1. Start with Spring Initializr</h2>

<p>
    <strong>Required:</strong> Start the project with Spring Initializr rather than
    manually creating the initial Maven and Spring Boot structure.
</p>

<p>
    Spring Initializr provides a convenient way to generate a JVM project with choices
    such as the build system, language, packaging, Java version, Spring Boot version,
    and dependencies.
</p>

<p>
    Open Spring Initializr and create a new Maven-based Java project.
</p>

<h3>Project Settings</h3>

<ul>
    <li><strong>Project:</strong> Maven</li>
    <li><strong>Language:</strong> Java</li>
    <li><strong>Spring Boot:</strong> 4.1.1</li>
    <li><strong>Packaging:</strong> Jar</li>
    <li><strong>Java:</strong> 21</li>
</ul>

<p>
    For this foundation project, we do not need to select a large collection of
    dependencies from Initializr.
</p>

<p>
    Start with the basic Spring Boot project and its standard test support. Additional
    dependencies will be introduced later when the project actually requires them.
</p>

<h2>2. Understand the Generated Project</h2>

<p>
    After downloading and extracting the project, the initial structure should look
    similar to:
</p>

<pre><code>demo-setup/
├── .mvn/
│   └── wrapper/
├── src/
│   ├── main/
│   │   ├── java/
│   │   └── resources/
│   └── test/
│       └── java/
├── mvnw
├── mvnw.cmd
├── pom.xml
└── ...</code></pre>

<p>
    The important files are:
</p>

<ul>
    <li><code>pom.xml</code> — Maven project configuration and dependencies.</li>
    <li><code>mvnw</code> — Maven Wrapper for Linux and macOS.</li>
    <li><code>mvnw.cmd</code> — Maven Wrapper for Windows.</li>
    <li><code>src/main/java</code> — Application source code.</li>
    <li><code>src/main/resources</code> — Application resources and configuration.</li>
    <li><code>src/test/java</code> — Automated tests.</li>
</ul>

<h2>3. Run the Generated Application First</h2>

<p>
    Before changing anything, run the generated project.
</p>

<p>
    <strong>Required:</strong> Verify the generated baseline before adding project
    standards.
</p>

<pre><code>./mvnw spring-boot:run</code></pre>

<p>
    This starts the Spring Boot application using Maven.
</p>

<p>
    On Windows, use:
</p>

<pre><code>mvnw.cmd spring-boot:run</code></pre>

<p>
    Starting from a known working baseline is important. If something fails after we
    make changes, we can determine whether the problem was already present or introduced
    by our configuration.
</p>

<h2>4. Understand Maven and the Maven Wrapper</h2>

<p>
    <strong>Maven — Required.</strong>
</p>

<p>
    Maven manages the project's build lifecycle and dependencies.
</p>

<p>
    <strong>Maven Wrapper — Required.</strong>
</p>

<p>
    The Maven Wrapper allows the project to invoke its configured Maven version without
    requiring every developer to install the same Maven version globally.
</p>

<p>
    The Spring Boot Maven Plugin also provides support for running Spring Boot
    applications and packaging executable JAR files.
</p>

<h3>Useful Maven Commands</h3>

<pre><code>./mvnw test</code></pre>

<p>
    Runs the automated tests.
</p>

<pre><code>./mvnw clean</code></pre>

<p>
    Removes generated build output from the <code>target</code> directory.
</p>

<pre><code>./mvnw compile</code></pre>

<p>
    Compiles the main application source code.
</p>

<pre><code>./mvnw package</code></pre>

<p>
    Packages the application into a JAR artifact.
</p>

<pre><code>./mvnw clean package</code></pre>

<p>
    Performs a clean build and creates a fresh application artifact.
</p>

<pre><code>./mvnw clean verify</code></pre>

<p>
    Performs the complete Maven verification lifecycle and becomes the main quality
    gate for this project.
</p>

<h2>5. Configure Application Properties</h2>

<p>
    <strong>Recommended:</strong> Use YAML for application configuration.
</p>

<p>
    The generated project can use <code>application.properties</code>. For this project,
    we use <code>application.yml</code> because YAML becomes easier to read when the
    configuration grows into nested sections.
</p>

<p>
    Create:
</p>

<pre><code>src/main/resources/application.yml</code></pre>

<p>
    Add:
</p>

<pre><code>spring:
  application:
    name: demo-setup</code></pre>

<p>
    Notice that the configuration is intentionally small.
</p>

<p>
    We do not add database, security, logging, server, or other configuration simply
    because those settings are common in production applications.
</p>

<h2>6. Externalize Environment-Specific Configuration</h2>

<p>
    <strong>Recommended:</strong> Keep deployment-specific values outside the application
    code.
</p>

<p>
    The application should not require Java source-code changes just because it is being
    deployed to another environment.
</p>

<p>
    For example, when the database is introduced later, configuration can use
    environment variables:
</p>

<pre><code>spring:
  datasource:
    url: \${DB_URL}
    username: \${DB_USERNAME}
    password: \${DB_PASSWORD}</code></pre>

<p>
    This allows the same application artifact to be used with different environment
    values.
</p>

<h2>7. Protect Secrets</h2>

<p>
    <strong>Required:</strong> Never commit real secrets to source control.
</p>

<p>
    Examples of secrets include:
</p>

<ul>
    <li>Database passwords</li>
    <li>API keys</li>
    <li>JWT signing keys</li>
    <li>Access tokens</li>
    <li>Cloud credentials</li>
    <li>Private certificates</li>
</ul>

<p>
    We use <code>.env.example</code> to document expected environment variables without
    storing real values.
</p>

<pre><code># Example only.
# Never commit real credentials.

DB_URL=
DB_USERNAME=
DB_PASSWORD=</code></pre>

<p>
    The real values belong in the environment or an appropriate secret-management
    mechanism.
</p>

<h2>8. Configure .gitignore</h2>

<p>
    <strong>Required:</strong> Prevent generated files, local configuration, IDE files,
    and secrets from being committed.
</p>

<p>
    A basic configuration includes:
</p>

<pre><code># Maven
target/

# IDE
.idea/
.vscode/
*.iml

# Logs
*.log

# Local environment
.env
.env.*
!.env.example

# Local Spring configuration
application-local.yml
application-local.yaml
application-local.properties</code></pre>

<p>
    The normal <code>application.yml</code> remains committed because it contains
    application defaults rather than private credentials.
</p>

<h2>9. Add Checkstyle</h2>

<p>
    <strong>Recommended:</strong> Add Checkstyle for basic coding-standard validation.
</p>

<p>
    Checkstyle helps identify inconsistent naming, imports, and other basic source-code
    problems.
</p>

<p>
    We intentionally use a small configuration rather than creating a huge list of
    restrictions.
</p>

<p>
    Add the Checkstyle Maven Plugin to the <code>&lt;plugins&gt;</code> section:
</p>

<pre><code>&lt;plugin&gt;
    &lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;
    &lt;artifactId&gt;maven-checkstyle-plugin&lt;/artifactId&gt;
    &lt;version&gt;3.6.0&lt;/version&gt;
    &lt;configuration&gt;
        &lt;configLocation&gt;checkstyle.xml&lt;/configLocation&gt;
        &lt;consoleOutput&gt;true&lt;/consoleOutput&gt;
        &lt;failsOnError&gt;true&lt;/failsOnError&gt;
        &lt;violationSeverity&gt;warning&lt;/violationSeverity&gt;
    &lt;/configuration&gt;
    &lt;executions&gt;
        &lt;execution&gt;
            &lt;id&gt;checkstyle&lt;/id&gt;
            &lt;phase&gt;verify&lt;/phase&gt;
            &lt;goals&gt;
                &lt;goal&gt;check&lt;/goal&gt;
            &lt;/goals&gt;
        &lt;/execution&gt;
    &lt;/executions&gt;
&lt;/plugin&gt;</code></pre>

<p>
    Create <code>checkstyle.xml</code> in the project root:
</p>

<pre><code>&lt;?xml version="1.0"?&gt;
&lt;!DOCTYPE module PUBLIC
    "-//Checkstyle//DTD Checkstyle Configuration 1.3//EN"
    "https://checkstyle.org/dtds/configuration_1_3.dtd"&gt;

&lt;module name="Checker"&gt;

    &lt;property name="charset" value="UTF-8"/&gt;

    &lt;module name="TreeWalker"&gt;

        &lt;!-- Naming --&gt;
        &lt;module name="TypeName"/&gt;
        &lt;module name="MethodName"/&gt;
        &lt;module name="ParameterName"/&gt;
        &lt;module name="LocalVariableName"/&gt;
        &lt;module name="MemberName"/&gt;
        &lt;module name="ConstantName"/&gt;

        &lt;!-- Imports --&gt;
        &lt;module name="AvoidStarImport"/&gt;
        &lt;module name="UnusedImports"/&gt;
        &lt;module name="RedundantImport"/&gt;

        &lt;!-- Basic code quality --&gt;
        &lt;module name="EmptyBlock"/&gt;
        &lt;module name="EmptyStatement"/&gt;
        &lt;module name="MissingSwitchDefault"/&gt;

    &lt;/module&gt;
&lt;/module&gt;</code></pre>

<p>
    Checkstyle can then be run independently:
</p>

<pre><code>./mvnw checkstyle:check</code></pre>

<p>
    It is also part of the Maven verification lifecycle.
</p>

<h2>10. Add Spotless Formatting</h2>

<p>
    <strong>Recommended:</strong> Use Spotless to automatically format Java source code.
</p>

<p>
    Checkstyle and Spotless have different responsibilities.
</p>

<ul>
    <li><strong>Spotless:</strong> Formats the source code.</li>
    <li><strong>Checkstyle:</strong> Checks coding standards.</li>
</ul>

<p>
    Add Spotless to <code>pom.xml</code>:
</p>

<pre><code>&lt;plugin&gt;
    &lt;groupId&gt;com.diffplug.spotless&lt;/groupId&gt;
    &lt;artifactId&gt;spotless-maven-plugin&lt;/artifactId&gt;
    &lt;version&gt;2.46.1&lt;/version&gt;

    &lt;configuration&gt;
        &lt;java&gt;
            &lt;googleJavaFormat&gt;
                &lt;version&gt;1.28.0&lt;/version&gt;
            &lt;/googleJavaFormat&gt;

            &lt;removeUnusedImports/&gt;
        &lt;/java&gt;
    &lt;/configuration&gt;

    &lt;executions&gt;
        &lt;execution&gt;
            &lt;id&gt;spotless-check&lt;/id&gt;
            &lt;phase&gt;verify&lt;/phase&gt;
            &lt;goals&gt;
                &lt;goal&gt;check&lt;/goal&gt;
            &lt;/goals&gt;
        &lt;/execution&gt;
    &lt;/executions&gt;
&lt;/plugin&gt;</code></pre>

<p>
    Apply formatting with:
</p>

<pre><code>./mvnw spotless:apply</code></pre>

<p>
    Check formatting without changing files:
</p>

<pre><code>./mvnw spotless:check</code></pre>

<p>
    We do not need multiple Java formatting tools.
</p>

<h2>11. Dependency Vulnerability Scanning</h2>

<p>
    <strong>Optional:</strong> Dependency vulnerability scanning.
</p>

<p>
    A third-party dependency can contain a known security vulnerability even when our
    own application code is secure.
</p>

<p>
    For this project, we use OWASP Dependency-Check as an optional security check.
</p>

<p>
    Add the following Maven plugin:
</p>

<pre><code>&lt;!-- OWASP Dependency-Check: Scans project dependencies for known vulnerabilities --&gt;
&lt;plugin&gt;
    &lt;groupId&gt;org.owasp&lt;/groupId&gt;
    &lt;artifactId&gt;dependency-check-maven&lt;/artifactId&gt;
    &lt;version&gt;12.1.8&lt;/version&gt;

    &lt;configuration&gt;
        &lt;failBuildOnCVSS&gt;7&lt;/failBuildOnCVSS&gt;
        &lt;format&gt;HTML&lt;/format&gt;
        &lt;outputDirectory&gt;\${project.build.directory}/dependency-check&lt;/outputDirectory&gt;
    &lt;/configuration&gt;

    &lt;executions&gt;
        &lt;execution&gt;
            &lt;id&gt;dependency-check&lt;/id&gt;
            &lt;phase&gt;verify&lt;/phase&gt;
            &lt;goals&gt;
                &lt;goal&gt;check&lt;/goal&gt;
            &lt;/goals&gt;
        &lt;/execution&gt;
    &lt;/executions&gt;
&lt;/plugin&gt;</code></pre>

<p>
    The scan can also be run directly:
</p>

<pre><code>./mvnw dependency-check:check</code></pre>

<p>
    The generated report is placed under:
</p>

<pre><code>target/dependency-check/</code></pre>

<p>
    The configured CVSS value of <code>7</code> is a project policy choice. It should
    not be treated as a universal security threshold.
</p>

<p>
    If a vulnerability is reported, do not immediately suppress it. First determine
    whether the dependency can be upgraded, replaced, or otherwise safely addressed.
</p>

<h2>12. Dependency Update Strategy</h2>

<p>
    <strong>Optional:</strong> A formal automated dependency-update system.
</p>

<p>
    Dependencies should still be kept reasonably up to date because updates can contain
    security fixes, bug fixes, compatibility improvements, and performance improvements.
</p>

<p>
    For this project, we do not introduce another dependency-management tool.
</p>

<p>
    Instead, use a controlled update process:
</p>

<pre><code>Dependency update available
    ↓
Review the new version
    ↓
Update the dependency
    ↓
Run tests
    ↓
Run formatting and quality checks
    ↓
Run full verification
    ↓
Review security findings
    ↓
Commit the update</code></pre>

<p>
    When Spring Boot already manages a dependency version, avoid manually overriding
    that version without a specific reason.
</p>

<p>
    For example:
</p>

<pre><code>&lt;dependency&gt;
    &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
    &lt;artifactId&gt;spring-boot-starter-test&lt;/artifactId&gt;
    &lt;scope&gt;test&lt;/scope&gt;
&lt;/dependency&gt;</code></pre>

<p>
    There is no need to manually specify a version when Spring Boot's dependency
    management already provides one.
</p>

<h3>Dependabot</h3>

<p>
    <strong>Optional:</strong> GitHub Dependabot can be introduced later when the
    repository is hosted on GitHub.
</p>

<p>
    It can help identify dependency updates and create update pull requests, but it is
    not necessary for the initial project foundation.
</p>

<h2>13. Testing</h2>

<p>
    <strong>Required:</strong> Keep the basic test setup generated by Spring Initializr.
</p>

<p>
    The standard Maven test directory is:
</p>

<pre><code>src/test/java/</code></pre>

<p>
    The project starts with a basic Spring Boot context test:
</p>

<pre><code>@SpringBootTest
class DemoSetupApplicationTests {

    @Test
    void contextLoads() {
    }

}</code></pre>

<p>
    This test verifies that the Spring application context can start successfully.
</p>

<p>
    Run it with:
</p>

<pre><code>./mvnw test</code></pre>

<p>
    More meaningful unit, integration, database, controller, and security tests will
    be introduced in later phases when those parts of the application exist.
</p>

<h2>14. Git Configuration</h2>

<p>
    <strong>Required:</strong> Use Git for source control.
</p>

<p>
    <strong>Recommended:</strong> Keep commits focused and use a consistent commit
    message format.
</p>

<h3>Commit Convention</h3>

<p>
    We use a simple Conventional Commits style:
</p>

<pre><code>type: short description</code></pre>

<p>
    Common types include:
</p>

<ul>
    <li><code>feat</code> — new functionality</li>
    <li><code>fix</code> — bug fix</li>
    <li><code>test</code> — test changes</li>
    <li><code>refactor</code> — code restructuring</li>
    <li><code>build</code> — build or dependency changes</li>
    <li><code>docs</code> — documentation changes</li>
    <li><code>chore</code> — maintenance</li>
</ul>

<p>
    Examples:
</p>

<pre><code>feat: add user registration
fix: handle duplicate email
test: add user registration tests
build: add checkstyle validation
docs: update project setup
refactor: simplify validation</code></pre>

<h3>Focused Commits</h3>

<p>
    Avoid putting unrelated changes into one commit.
</p>

<p>
    Prefer:
</p>

<pre><code>build: add checkstyle validation
build: enforce java formatting
docs: document development workflow</code></pre>

<p>
    instead of:
</p>

<pre><code>feat: complete project</code></pre>

<p>
    Focused commits make the history easier to review, understand, and revert.
</p>

<h2>15. Branch Strategy</h2>

<p>
    <strong>Recommended:</strong> Use a simple branch strategy.
</p>

<p>
    Keep <code>main</code> as the stable branch.
</p>

<pre><code>main</code></pre>

<p>
    Feature branches:
</p>

<pre><code>feature/user-registration
feature/authentication</code></pre>

<p>
    Bug-fix branches:
</p>

<pre><code>fix/invalid-email-validation
fix/database-timeout</code></pre>

<p>
    GitFlow is not needed for this project. Additional branches such as
    <code>develop</code>, <code>release</code>, and <code>hotfix</code> would add process
    without solving a current problem.
</p>

<h2>16. Useful Git Commands</h2>

<p>
    Check repository status:
</p>

<pre><code>git status</code></pre>

<p>
    Shows modified, staged, deleted, and untracked files.
</p>

<p>
    Review changes:
</p>

<pre><code>git diff</code></pre>

<p>
    Shows unstaged changes.
</p>

<p>
    View commit history:
</p>

<pre><code>git log --oneline</code></pre>

<p>
    Shows a compact commit history.
</p>

<p>
    Create a feature branch:
</p>

<pre><code>git checkout -b feature/my-feature</code></pre>

<p>
    Push a feature branch:
</p>

<pre><code>git push -u origin feature/my-feature</code></pre>

<p>
    Create a commit:
</p>

<pre><code>git add .
git commit -m "feat: add my feature"</code></pre>

<h2>17. The Development Workflow</h2>

<p>
    The development workflow for the project is intentionally simple:
</p>

<pre><code>Create or switch to a feature branch
    ↓
Implement the change
    ↓
Format the code
    ↓
Run tests
    ↓
Run full verification
    ↓
Review changes
    ↓
Create a focused commit
    ↓
Push the branch
    ↓
Create a Pull Request</code></pre>

<p>
    Before committing Java changes:
</p>

<pre><code>./mvnw spotless:apply</code></pre>

<p>
    Run tests:
</p>

<pre><code>./mvnw test</code></pre>

<p>
    Run the complete verification:
</p>

<pre><code>./mvnw clean verify</code></pre>

<h2>18. What We Did Not Add</h2>

<p>
    A good project foundation is not the one with the most tools.
</p>

<p>
    Several commonly used technologies are deliberately not part of this phase.
</p>

<h3>PMD</h3>

<p>
    <strong>Not Needed:</strong> Additional static analysis is not currently justified.
</p>

<h3>SpotBugs</h3>

<p>
    <strong>Not Needed:</strong> Another static-analysis layer would add complexity
    without a demonstrated requirement.
</p>

<h3>SonarQube</h3>

<p>
    <strong>Not Needed:</strong> A centralized code-quality platform is unnecessary
    for this simple project.
</p>

<h3>Pre-commit Framework</h3>

<p>
    <strong>Optional:</strong> A pre-commit framework can be useful for teams that need
    mandatory local checks, but Maven already provides the project's main verification
    command.
</p>

<h3>Spring Profiles</h3>

<p>
    <strong>Not Needed Yet:</strong> There is not enough environment-specific
    configuration to justify multiple profiles at this stage.
</p>

<h3>Docker</h3>

<p>
    <strong>Not Needed Yet:</strong> Containerization belongs to a later phase.
</p>

<h3>Database</h3>

<p>
    <strong>Not Needed Yet:</strong> Database configuration belongs to Phase 2.
</p>

<h2>19. Final Verification</h2>

<p>
    Before considering the foundation complete, verify the project using the following
    commands.
</p>

<h3>Run Tests</h3>

<pre><code>./mvnw test</code></pre>

<h3>Check Formatting</h3>

<pre><code>./mvnw spotless:check</code></pre>

<h3>Run Checkstyle</h3>

<pre><code>./mvnw checkstyle:check</code></pre>

<h3>Run the Full Build</h3>

<pre><code>./mvnw clean verify</code></pre>

<h3>Start the Application</h3>

<pre><code>./mvnw spring-boot:run</code></pre>

<p>
    The application should start without errors.
</p>

<h2>20. Phase 1 Checklist</h2>

<ul>
    <li>✓ Project generated with Spring Initializr</li>
    <li>✓ Java 21 selected</li>
    <li>✓ Spring Boot 4.1.1 selected</li>
    <li>✓ Maven selected</li>
    <li>✓ Maven Wrapper available</li>
    <li>✓ Application configuration moved to YAML</li>
    <li>✓ External configuration approach established</li>
    <li>✓ Secrets excluded from source control</li>
    <li>✓ .gitignore configured</li>
    <li>✓ Checkstyle configured</li>
    <li>✓ Spotless configured</li>
    <li>✓ Dependency vulnerability scanning documented</li>
    <li>✓ Dependency update strategy documented</li>
    <li>✓ Basic tests configured</li>
    <li>✓ Git conventions established</li>
    <li>✓ Branch strategy established</li>
    <li>✓ Local development workflow established</li>
    <li>✓ Maven verification workflow established</li>
</ul>

<h2>21. Git Commits for Phase 1</h2>

<p>
    The changes should be committed at logical milestones rather than as one huge
    commit.
</p>

<pre><code>chore: establish project foundation
build: add checkstyle validation
build: enforce java formatting
build: add dependency vulnerability scanning
docs: document development workflow</code></pre>

<p>
    If a particular step does not change any files, there is no reason to create an
    empty commit.
</p>

<h2>Conclusion</h2>

<p>
    A clean Spring Boot project foundation is about making good decisions early rather
    than adding as many technologies as possible.
</p>

<p>
    We started with Spring Initializr and a minimal Maven project, then introduced
    configuration management, secret protection, code-quality checks, formatting,
    dependency security, testing, and Git conventions.
</p>

<p>
    Notice what we did not do: we did not add a database, security framework, Docker,
    Kubernetes, distributed tracing, or a large collection of static-analysis tools.
</p>

<p>
    Those technologies may be valuable later, but they should be introduced when the
    application actually needs them.
</p>

<p>
    This is the principle we will continue throughout the project:
    <strong>add the simplest tool that solves the actual problem.</strong>
</p>

<p>
    With the foundation complete, the next phase can focus on the database without
    mixing unrelated concerns into the initial setup.
</p>
`,
});