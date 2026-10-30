/* V4L CMMC Readiness: data file.
   Plain JSON assigned to window.CMMC_DATA so the page works when opened
   straight from a folder (file://), where browsers block fetch() of .json.

   controls   : NIST SP 800-171 Rev 2, 110 requirements (CMMC Level 2).
                Mirrors the CMMC_L2_110 sheet of 04_Atomic_GRC_Enterprise_Workbook.xlsx.
   automation : per-family data source + automation method. SAMPLE until replaced
                from 06_CMMC_Control_Automation_Map_and_RTM.xlsx (per-control rows
                in "byControl" override the family default).
   sample     : demo statuses, owners, ACAS findings and roadmap. Clearly SAMPLE. */
window.CMMC_DATA = {
  "version": 1,
  "families": [
    { "code": "AC", "name": "Access Control" },
    { "code": "AT", "name": "Awareness and Training" },
    { "code": "AU", "name": "Audit and Accountability" },
    { "code": "CM", "name": "Configuration Management" },
    { "code": "IA", "name": "Identification and Authentication" },
    { "code": "IR", "name": "Incident Response" },
    { "code": "MA", "name": "Maintenance" },
    { "code": "MP", "name": "Media Protection" },
    { "code": "PE", "name": "Physical Protection" },
    { "code": "PS", "name": "Personnel Security" },
    { "code": "RA", "name": "Risk Assessment" },
    { "code": "CA", "name": "Security Assessment" },
    { "code": "SC", "name": "System and Communications Protection" },
    { "code": "SI", "name": "System and Information Integrity" }
  ],

  "controls": [
    { "id": "3.1.1",  "fam": "AC", "type": "Basic",   "req": "Limit system access to authorized users, processes acting on behalf of authorized users, and devices (including other systems)." },
    { "id": "3.1.2",  "fam": "AC", "type": "Basic",   "req": "Limit system access to the types of transactions and functions that authorized users are permitted to execute." },
    { "id": "3.1.3",  "fam": "AC", "type": "Derived", "req": "Control the flow of CUI in accordance with approved authorizations." },
    { "id": "3.1.4",  "fam": "AC", "type": "Derived", "req": "Separate the duties of individuals to reduce the risk of malevolent activity without collusion." },
    { "id": "3.1.5",  "fam": "AC", "type": "Derived", "req": "Employ the principle of least privilege, including for specific security functions and privileged accounts." },
    { "id": "3.1.6",  "fam": "AC", "type": "Derived", "req": "Use non-privileged accounts or roles when accessing nonsecurity functions." },
    { "id": "3.1.7",  "fam": "AC", "type": "Derived", "req": "Prevent non-privileged users from executing privileged functions and capture the execution of such functions in audit logs." },
    { "id": "3.1.8",  "fam": "AC", "type": "Derived", "req": "Limit unsuccessful logon attempts." },
    { "id": "3.1.9",  "fam": "AC", "type": "Derived", "req": "Provide privacy and security notices consistent with applicable CUI rules." },
    { "id": "3.1.10", "fam": "AC", "type": "Derived", "req": "Use session lock with pattern-hiding displays to prevent access and viewing of data after a period of inactivity." },
    { "id": "3.1.11", "fam": "AC", "type": "Derived", "req": "Terminate (automatically) a user session after a defined condition." },
    { "id": "3.1.12", "fam": "AC", "type": "Derived", "req": "Monitor and control remote access sessions." },
    { "id": "3.1.13", "fam": "AC", "type": "Derived", "req": "Employ cryptographic mechanisms to protect the confidentiality of remote access sessions." },
    { "id": "3.1.14", "fam": "AC", "type": "Derived", "req": "Route remote access via managed access control points." },
    { "id": "3.1.15", "fam": "AC", "type": "Derived", "req": "Authorize remote execution of privileged commands and remote access to security-relevant information." },
    { "id": "3.1.16", "fam": "AC", "type": "Derived", "req": "Authorize wireless access prior to allowing such connections." },
    { "id": "3.1.17", "fam": "AC", "type": "Derived", "req": "Protect wireless access using authentication and encryption." },
    { "id": "3.1.18", "fam": "AC", "type": "Derived", "req": "Control connection of mobile devices." },
    { "id": "3.1.19", "fam": "AC", "type": "Derived", "req": "Encrypt CUI on mobile devices and mobile computing platforms." },
    { "id": "3.1.20", "fam": "AC", "type": "Derived", "req": "Verify and control/limit connections to and use of external systems." },
    { "id": "3.1.21", "fam": "AC", "type": "Derived", "req": "Limit use of portable storage devices on external systems." },
    { "id": "3.1.22", "fam": "AC", "type": "Derived", "req": "Control CUI posted or processed on publicly accessible systems." },

    { "id": "3.2.1",  "fam": "AT", "type": "Basic",   "req": "Ensure that managers, systems administrators, and users of organizational systems are made aware of the security risks associated with their activities and of the applicable policies, standards, and procedures related to the security of those systems." },
    { "id": "3.2.2",  "fam": "AT", "type": "Basic",   "req": "Ensure that personnel are trained to carry out their assigned information security-related duties and responsibilities." },
    { "id": "3.2.3",  "fam": "AT", "type": "Derived", "req": "Provide security awareness training on recognizing and reporting potential indicators of insider threat." },

    { "id": "3.3.1",  "fam": "AU", "type": "Basic",   "req": "Create and retain system audit logs and records to the extent needed to enable the monitoring, analysis, investigation, and reporting of unlawful or unauthorized system activity." },
    { "id": "3.3.2",  "fam": "AU", "type": "Basic",   "req": "Ensure that the actions of individual system users can be uniquely traced to those users, so they can be held accountable for their actions." },
    { "id": "3.3.3",  "fam": "AU", "type": "Derived", "req": "Review and update logged events." },
    { "id": "3.3.4",  "fam": "AU", "type": "Derived", "req": "Alert in the event of an audit logging process failure." },
    { "id": "3.3.5",  "fam": "AU", "type": "Derived", "req": "Correlate audit record review, analysis, and reporting processes for investigation and response to indications of unlawful, unauthorized, suspicious, or unusual activity." },
    { "id": "3.3.6",  "fam": "AU", "type": "Derived", "req": "Provide audit record reduction and report generation to support on-demand analysis and reporting." },
    { "id": "3.3.7",  "fam": "AU", "type": "Derived", "req": "Provide a system capability that compares and synchronizes internal system clocks with an authoritative source to generate time stamps for audit records." },
    { "id": "3.3.8",  "fam": "AU", "type": "Derived", "req": "Protect audit information and audit logging tools from unauthorized access, modification, and deletion." },
    { "id": "3.3.9",  "fam": "AU", "type": "Derived", "req": "Limit management of audit logging functionality to a subset of privileged users." },

    { "id": "3.4.1",  "fam": "CM", "type": "Basic",   "req": "Establish and maintain baseline configurations and inventories of organizational systems (including hardware, software, firmware, and documentation) throughout the respective system development life cycles." },
    { "id": "3.4.2",  "fam": "CM", "type": "Basic",   "req": "Establish and enforce security configuration settings for information technology products employed in organizational systems." },
    { "id": "3.4.3",  "fam": "CM", "type": "Derived", "req": "Track, review, approve or disapprove, and log changes to organizational systems." },
    { "id": "3.4.4",  "fam": "CM", "type": "Derived", "req": "Analyze the security impact of changes prior to implementation." },
    { "id": "3.4.5",  "fam": "CM", "type": "Derived", "req": "Define, document, approve, and enforce physical and logical access restrictions associated with changes to organizational systems." },
    { "id": "3.4.6",  "fam": "CM", "type": "Derived", "req": "Employ the principle of least functionality by configuring organizational systems to provide only essential capabilities." },
    { "id": "3.4.7",  "fam": "CM", "type": "Derived", "req": "Restrict, disable, or prevent the use of nonessential programs, functions, ports, protocols, and services." },
    { "id": "3.4.8",  "fam": "CM", "type": "Derived", "req": "Apply deny-by-exception (blacklisting) policy to prevent the use of unauthorized software or deny-all, permit-by-exception (whitelisting) policy to allow the execution of authorized software." },
    { "id": "3.4.9",  "fam": "CM", "type": "Derived", "req": "Control and monitor user-installed software." },

    { "id": "3.5.1",  "fam": "IA", "type": "Basic",   "req": "Identify system users, processes acting on behalf of users, and devices." },
    { "id": "3.5.2",  "fam": "IA", "type": "Basic",   "req": "Authenticate (or verify) the identities of users, processes, or devices, as a prerequisite to allowing access to organizational systems." },
    { "id": "3.5.3",  "fam": "IA", "type": "Derived", "req": "Use multifactor authentication for local and network access to privileged accounts and for network access to non-privileged accounts." },
    { "id": "3.5.4",  "fam": "IA", "type": "Derived", "req": "Employ replay-resistant authentication mechanisms for network access to privileged and non-privileged accounts." },
    { "id": "3.5.5",  "fam": "IA", "type": "Derived", "req": "Prevent reuse of identifiers for a defined period." },
    { "id": "3.5.6",  "fam": "IA", "type": "Derived", "req": "Disable identifiers after a defined period of inactivity." },
    { "id": "3.5.7",  "fam": "IA", "type": "Derived", "req": "Enforce a minimum password complexity and change of characters when new passwords are created." },
    { "id": "3.5.8",  "fam": "IA", "type": "Derived", "req": "Prohibit password reuse for a specified number of generations." },
    { "id": "3.5.9",  "fam": "IA", "type": "Derived", "req": "Allow temporary password use for system logons with an immediate change to a permanent password." },
    { "id": "3.5.10", "fam": "IA", "type": "Derived", "req": "Store and transmit only cryptographically-protected passwords." },
    { "id": "3.5.11", "fam": "IA", "type": "Derived", "req": "Obscure feedback of authentication information." },

    { "id": "3.6.1",  "fam": "IR", "type": "Basic",   "req": "Establish an operational incident-handling capability for organizational systems that includes preparation, detection, analysis, containment, recovery, and user response activities." },
    { "id": "3.6.2",  "fam": "IR", "type": "Basic",   "req": "Track, document, and report incidents to designated officials and/or authorities both internal and external to the organization." },
    { "id": "3.6.3",  "fam": "IR", "type": "Derived", "req": "Test the organizational incident response capability." },

    { "id": "3.7.1",  "fam": "MA", "type": "Basic",   "req": "Perform maintenance on organizational systems." },
    { "id": "3.7.2",  "fam": "MA", "type": "Basic",   "req": "Provide controls on the tools, techniques, mechanisms, and personnel used to conduct system maintenance." },
    { "id": "3.7.3",  "fam": "MA", "type": "Derived", "req": "Ensure equipment removed for off-site maintenance is sanitized of any CUI." },
    { "id": "3.7.4",  "fam": "MA", "type": "Derived", "req": "Check media containing diagnostic and test programs for malicious code before the media are used in organizational systems." },
    { "id": "3.7.5",  "fam": "MA", "type": "Derived", "req": "Require multifactor authentication to establish nonlocal maintenance sessions via external network connections and terminate such connections when nonlocal maintenance is complete." },
    { "id": "3.7.6",  "fam": "MA", "type": "Derived", "req": "Supervise the maintenance activities of maintenance personnel without required access authorization." },

    { "id": "3.8.1",  "fam": "MP", "type": "Basic",   "req": "Protect (i.e., physically control and securely store) system media containing CUI, both paper and digital." },
    { "id": "3.8.2",  "fam": "MP", "type": "Basic",   "req": "Limit access to CUI on system media to authorized users." },
    { "id": "3.8.3",  "fam": "MP", "type": "Basic",   "req": "Sanitize or destroy system media containing CUI before disposal or release for reuse." },
    { "id": "3.8.4",  "fam": "MP", "type": "Derived", "req": "Mark media with necessary CUI markings and distribution limitations." },
    { "id": "3.8.5",  "fam": "MP", "type": "Derived", "req": "Control access to media containing CUI and maintain accountability for media during transport outside of controlled areas." },
    { "id": "3.8.6",  "fam": "MP", "type": "Derived", "req": "Implement cryptographic mechanisms to protect the confidentiality of CUI stored on digital media during transport unless otherwise protected by alternative physical safeguards." },
    { "id": "3.8.7",  "fam": "MP", "type": "Derived", "req": "Control the use of removable media on system components." },
    { "id": "3.8.8",  "fam": "MP", "type": "Derived", "req": "Prohibit the use of portable storage devices when such devices have no identifiable owner." },
    { "id": "3.8.9",  "fam": "MP", "type": "Derived", "req": "Protect the confidentiality of backup CUI at storage locations." },

    { "id": "3.10.1", "fam": "PE", "type": "Basic",   "req": "Limit physical access to organizational systems, equipment, and the respective operating environments to authorized individuals." },
    { "id": "3.10.2", "fam": "PE", "type": "Basic",   "req": "Protect and monitor the physical facility and support infrastructure for organizational systems." },
    { "id": "3.10.3", "fam": "PE", "type": "Derived", "req": "Escort visitors and monitor visitor activity." },
    { "id": "3.10.4", "fam": "PE", "type": "Derived", "req": "Maintain audit logs of physical access." },
    { "id": "3.10.5", "fam": "PE", "type": "Derived", "req": "Control and manage physical access devices." },
    { "id": "3.10.6", "fam": "PE", "type": "Derived", "req": "Enforce safeguarding measures for CUI at alternate work sites." },

    { "id": "3.9.1",  "fam": "PS", "type": "Basic",   "req": "Screen individuals prior to authorizing access to organizational systems containing CUI." },
    { "id": "3.9.2",  "fam": "PS", "type": "Basic",   "req": "Ensure that organizational systems containing CUI are protected during and after personnel actions such as terminations and transfers." },

    { "id": "3.11.1", "fam": "RA", "type": "Basic",   "req": "Periodically assess the risk to organizational operations (including mission, functions, image, or reputation), organizational assets, and individuals, resulting from the operation of organizational systems and the associated processing, storage, or transmission of CUI." },
    { "id": "3.11.2", "fam": "RA", "type": "Derived", "req": "Scan for vulnerabilities in organizational systems and applications periodically and when new vulnerabilities affecting those systems and applications are identified." },
    { "id": "3.11.3", "fam": "RA", "type": "Derived", "req": "Remediate vulnerabilities in accordance with risk assessments." },

    { "id": "3.12.1", "fam": "CA", "type": "Basic",   "req": "Periodically assess the security controls in organizational systems to determine if the controls are effective in their application." },
    { "id": "3.12.2", "fam": "CA", "type": "Basic",   "req": "Develop and implement plans of action designed to correct deficiencies and reduce or eliminate vulnerabilities in organizational systems." },
    { "id": "3.12.3", "fam": "CA", "type": "Basic",   "req": "Monitor security controls on an ongoing basis to ensure the continued effectiveness of the controls." },
    { "id": "3.12.4", "fam": "CA", "type": "Basic",   "req": "Develop, document, and periodically update system security plans that describe system boundaries, system environments of operation, how security requirements are implemented, and the relationships with or connections to other systems." },

    { "id": "3.13.1", "fam": "SC", "type": "Basic",   "req": "Monitor, control, and protect communications (i.e., information transmitted or received by organizational systems) at the external boundaries and key internal boundaries of organizational systems." },
    { "id": "3.13.2", "fam": "SC", "type": "Basic",   "req": "Employ architectural designs, software development techniques, and systems engineering principles that promote effective information security within organizational systems." },
    { "id": "3.13.3", "fam": "SC", "type": "Derived", "req": "Separate user functionality from system management functionality." },
    { "id": "3.13.4", "fam": "SC", "type": "Derived", "req": "Prevent unauthorized and unintended information transfer via shared system resources." },
    { "id": "3.13.5", "fam": "SC", "type": "Derived", "req": "Implement subnetworks for publicly accessible system components that are physically or logically separated from internal networks." },
    { "id": "3.13.6", "fam": "SC", "type": "Derived", "req": "Deny network communications traffic by default and allow network communications traffic by exception (i.e., deny all, permit by exception)." },
    { "id": "3.13.7", "fam": "SC", "type": "Derived", "req": "Prevent remote devices from simultaneously establishing non-remote connections with organizational systems and communicating via some other connection to resources in external networks (i.e., split tunneling)." },
    { "id": "3.13.8", "fam": "SC", "type": "Derived", "req": "Implement cryptographic mechanisms to prevent unauthorized disclosure of CUI during transmission unless otherwise protected by alternative physical safeguards." },
    { "id": "3.13.9", "fam": "SC", "type": "Derived", "req": "Terminate network connections associated with communications sessions at the end of the sessions or after a defined period of inactivity." },
    { "id": "3.13.10","fam": "SC", "type": "Derived", "req": "Establish and manage cryptographic keys for cryptography employed in organizational systems." },
    { "id": "3.13.11","fam": "SC", "type": "Derived", "req": "Employ FIPS-validated cryptography when used to protect the confidentiality of CUI." },
    { "id": "3.13.12","fam": "SC", "type": "Derived", "req": "Prohibit remote activation of collaborative computing devices and provide indication of devices in use to users present at the device." },
    { "id": "3.13.13","fam": "SC", "type": "Derived", "req": "Control and monitor the use of mobile code." },
    { "id": "3.13.14","fam": "SC", "type": "Derived", "req": "Control and monitor the use of Voice over Internet Protocol (VoIP) technologies." },
    { "id": "3.13.15","fam": "SC", "type": "Derived", "req": "Protect the authenticity of communications sessions." },
    { "id": "3.13.16","fam": "SC", "type": "Derived", "req": "Protect the confidentiality of CUI at rest." },

    { "id": "3.14.1", "fam": "SI", "type": "Basic",   "req": "Identify, report, and correct system flaws in a timely manner." },
    { "id": "3.14.2", "fam": "SI", "type": "Basic",   "req": "Provide protection from malicious code at designated locations within organizational systems." },
    { "id": "3.14.3", "fam": "SI", "type": "Basic",   "req": "Monitor system security alerts and advisories and take action in response." },
    { "id": "3.14.4", "fam": "SI", "type": "Derived", "req": "Update malicious code protection mechanisms when new releases are available." },
    { "id": "3.14.5", "fam": "SI", "type": "Derived", "req": "Perform periodic scans of organizational systems and real-time scans of files from external sources as files are downloaded, opened, or executed." },
    { "id": "3.14.6", "fam": "SI", "type": "Derived", "req": "Monitor organizational systems, including inbound and outbound communications traffic, to detect attacks and indicators of potential attacks." },
    { "id": "3.14.7", "fam": "SI", "type": "Derived", "req": "Identify unauthorized use of organizational systems." }
  ],

  "automation": {
    "isSample": true,
    "byFamily": {
      "AC": { "source": "Identity provider (Entra ID / Active Directory)", "method": "API export of users, groups and conditional-access policies" },
      "AT": { "source": "Training platform (LMS) records", "method": "Completion report import" },
      "AU": { "source": "SIEM / central log platform", "method": "Log-source health check via API" },
      "CM": { "source": "Endpoint management (Intune / SCCM)", "method": "Baseline compliance report" },
      "IA": { "source": "Identity provider (Entra ID / Active Directory)", "method": "MFA and password-policy export" },
      "IR": { "source": "Incident response plan + ticketing system", "method": "Manual evidence upload" },
      "MA": { "source": "Maintenance logs / ticketing system", "method": "Manual evidence upload" },
      "MP": { "source": "Endpoint encryption / DLP console", "method": "Encryption status report" },
      "PE": { "source": "Badge / physical access control system", "method": "Access log export" },
      "PS": { "source": "HR system", "method": "Onboarding / offboarding report" },
      "RA": { "source": "ACAS (Nessus) vulnerability scanner", "method": "Scan results import" },
      "CA": { "source": "System Security Plan and POA&M", "method": "Document review" },
      "SC": { "source": "Firewall / network device configurations", "method": "Config export and rule review" },
      "SI": { "source": "EDR / antivirus console", "method": "Agent coverage and definition status report" }
    },
    "byControl": {}
  },

  "sample": {
    "label": "SAMPLE DATA: demo client, not a real assessment",
    "client": "Sample Client",
    "statusCodes": "M = Met, P = Partial, N = Not met, A = N/A, - = Not assessed. One letter per control, in the order of the controls list.",
    "statuses": {
      "AC": "MMMPMMNMMMMPMNMMPMNMMA",
      "AT": "MMP",
      "AU": "MPMNMMPM-",
      "CM": "MPMMNPM-M",
      "IA": "MMNMMPMMMMM",
      "IR": "PN-",
      "MA": "MMMA-M",
      "MP": "MMMPMNMM-",
      "PE": "MMMMPA",
      "PS": "MM",
      "RA": "MPN",
      "CA": "PNP-",
      "SC": "MMMPMMNMMMN-MMPM",
      "SI": "MMPMMN-"
    },
    "owners": {
      "AC": "IT Admin", "AT": "HR / Training", "AU": "IT Admin", "CM": "IT Admin",
      "IA": "IT Admin", "IR": "Security Lead", "MA": "IT Admin", "MP": "Facilities",
      "PE": "Facilities", "PS": "HR", "RA": "Security Lead", "CA": "Compliance Lead",
      "SC": "Network Engineer", "SI": "Security Lead"
    },
    "findings": [
      { "id": "S-001", "title": "Apache Log4j remote code execution (outdated library)", "severity": "Critical", "hosts": 1,  "controls": ["3.14.1", "3.11.3"], "evidence": "ACAS scan export" },
      { "id": "S-002", "title": "Missing Windows security updates",                       "severity": "High",     "hosts": 12, "controls": ["3.14.1", "3.11.3"], "evidence": "ACAS scan export" },
      { "id": "S-003", "title": "SMBv1 enabled on Windows hosts",                          "severity": "High",     "hosts": 4,  "controls": ["3.4.7", "3.13.6"],  "evidence": "ACAS scan export" },
      { "id": "S-004", "title": "Audit logging disabled for logon events",                  "severity": "High",     "hosts": 7,  "controls": ["3.3.1", "3.3.2"],   "evidence": "ACAS compliance audit" },
      { "id": "S-005", "title": "Local administrator account enabled for daily use",        "severity": "High",     "hosts": 5,  "controls": ["3.1.5", "3.1.6"],   "evidence": "ACAS compliance audit" },
      { "id": "S-006", "title": "TLS 1.0 protocol still accepted",                          "severity": "Medium",   "hosts": 6,  "controls": ["3.13.8", "3.13.11"], "evidence": "ACAS scan export" },
      { "id": "S-007", "title": "Medium-strength cipher suites supported",                  "severity": "Medium",   "hosts": 3,  "controls": ["3.13.11"],          "evidence": "ACAS scan export" },
      { "id": "S-008", "title": "Certificate signed with a weak hashing algorithm",         "severity": "Medium",   "hosts": 2,  "controls": ["3.13.10", "3.13.15"], "evidence": "ACAS scan export" },
      { "id": "S-009", "title": "Password policy minimum length below 14 characters",       "severity": "Medium",   "hosts": 9,  "controls": ["3.5.7"],            "evidence": "ACAS compliance audit" },
      { "id": "S-010", "title": "ICMP timestamp responses disclose system time",            "severity": "Low",      "hosts": 9,  "controls": ["3.13.1"],           "evidence": "ACAS scan export" }
    ],
    "roadmap": [
      { "phase": 1, "name": "Scope & CUI inventory",   "days": 30, "pct": 100 },
      { "phase": 2, "name": "Gap assessment",          "days": 45, "pct": 60 },
      { "phase": 3, "name": "Remediation & POA&M",     "days": 90, "pct": 15 },
      { "phase": 4, "name": "Assessment readiness",    "days": 30, "pct": 0 }
    ]
  }
  /* V4L ownership details live in internal.js, which is not published. */
};
