import PageLayout from "@/Layouts/PageLayout";
import {Head} from "@inertiajs/react";

export default function Dashboard(props) {
    return (
        <PageLayout
            user={props.auth.user}
            errors={props.errors}
            headTitle={"Regulations"}
            cartAmount={props.auth.cartAmount}
        >
            {" "}
            <section className="mx-8 md:mx-32 lg:mx-52 xl:mx-80">
                <Head>
                    <title>Terms of Service - Furni Visual</title>
                </Head>
                <div className="mx-auto max-w-6xl p-6 bg-white rounded-md shadow-md">
                    <h1 className="text-3xl font-semibold mb-4 text-center">
                        Terms of Service - Furni Visual{" "}
                    </h1>
                    <h2 className="text-xl font-semibold mt-6 mb-2 text-center">
                        I. General Definitions
                    </h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            <strong>Terms </strong> – these terms and conditions
                        </li>
                        <li>
                            <strong>Service </strong> – the internet service
                            “furnivisual.com,” operating at
                            https://furnivisual.com/
                        </li>
                        {" "}
                        <li>
                            <strong>Service Provider </strong> – the company
                            “Erynek Ltd.” with the registered address: 30-698
                            Kraków ul. Szybisko 26, NIP: 6793014045,
                        </li>
                        {" "}
                        <li>
                            <strong>Service User </strong> – any natural person
                            accessing the Service and using services provided
                            through the Service by the Service Provider.
                        </li>
                        <li>
                            <strong>Electronic Communication</strong> –
                            Communication between parties via electronic mail
                            (email) and contact forms available on the website.
                        </li>
                    </ul>
                    <h2 className="text-xl font-semibold mt-6 mb-2 text-center">
                        II. General Provisions
                    </h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            The Terms define the rules for the functioning and
                            use of the Service, as well as specify the scope of
                            rights and obligations of Service Users and the
                            Service Provider related to the use of the Service.
                        </li>
                        <li>
                            The Service Provider’s services involve providing
                            free tools in the form of the Service, enabling
                            Service Users to access content in the form of
                            posts, articles, audiovisual materials, or web
                            applications and electronic forms.
                        </li>
                        <li>
                            Any content, articles, and information containing
                            features of tips or advice published on the Service
                            are only a general collection of information and are
                            not directed to individual Service Users. The
                            Service Provider is not responsible for their use by
                            Service Users.
                        </li>
                        <li>
                            Service Users take full responsibility for the way
                            they use materials provided within the Service,
                            including their use in accordance with applicable
                            legal regulations.
                        </li>
                        <li>
                            The Service Provider does not provide any warranty
                            regarding the usefulness of materials posted on the
                            Service.
                        </li>
                        <li>
                            The Service Provider is not responsible for any
                            damages incurred by Service Users of the Service or
                            third parties in connection with the use of the
                            Service. The Service User using the Service assumes
                            all risks associated with its use, especially with
                            the use and utilization of information posted on the
                            Service.{" "}
                        </li>
                    </ul>
                    <h2 className="text-xl font-semibold mt-6 mb-2 text-center">
                        III. Terms of Service Use
                    </h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            Use of the Service by each Service User is free and
                            voluntary.{" "}
                        </li>
                        <li>
                            Service Users are obligated to familiarize
                            themselves with the Terms and other documents that
                            constitute its integral part, and they must fully
                            accept its provisions to continue using the Service.
                        </li>
                        <li>
                            Service Users may not use any data obtained on the
                            Service for marketing purposes.{" "}
                        </li>
                        <li>
                            Technical requirements for using the Service:
                            <ul className="list-disc pl-6 space-y-2">
                                <li>
                                    Device with a display for viewing web pages,
                                </li>
                                <li>Internet connection,</li>
                                <li>
                                    Any web browser that displays web pages in
                                    accordance with the standards and provisions
                                    of the W3C Consortium and supports websites
                                    provided in HTML5,
                                </li>
                                <li>Enabled support for JavaScript scripts,</li>
                                <li>Enabled support for Cookie files.</li>
                            </ul>
                        </li>
                        <li>
                            To ensure the security of the Service Provider,
                            Service Users, and other Service Users using the
                            Service, all Service Users should adhere to
                            generally accepted network security principles,{" "}
                        </li>
                        <li>
                            Prohibited actions performed personally by Service
                            Users or using software:
                            <ul className="list-disc pl-6 space-y-2">
                                <li>
                                    Without written consent, decompilation and
                                    analysis of the source code,
                                </li>
                                <li>
                                    Without written consent, actions causing
                                    excessive server load of the Service,
                                </li>
                                <li>
                                    Without written consent, attempts to detect
                                    vulnerabilities in the Service’s security
                                    and server configuration,
                                </li>
                                <li>
                                    Attempts to upload or inject code, scripts,
                                    and software into the server and database
                                    that could harm the Service’s software,
                                    other Service Users, or the Service Provider
                                    without written consent,
                                </li>
                                <li>
                                    Attempts to upload or inject code, scripts,
                                    and software into the server and database
                                    that could track or steal data of Service
                                    Users or the Service Provider without
                                    written consent,
                                </li>
                                <li>
                                    Any actions aimed at damaging, blocking the
                                    operation of the Service or preventing the
                                    achievement of the Service’s purpose.
                                </li>
                            </ul>
                        </li>
                        <li>
                            In case of detecting the occurrence or potential
                            occurrence of a Cybersecurity incident or violation
                            of GDPR, Service Users should first report this to
                            the Service Provider to quickly resolve the
                            issue/threat and secure the interests of all Service
                            Users of the Service.
                        </li>
                    </ul>
                    <h2 className="text-xl font-semibold mt-6 mb-2 text-center">
                        IV. Conditions and Rules of Registration
                    </h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            Service Users can use the Service without the need
                            for registration.
                        </li>
                        <li>
                            Service Users must be registered and have an account
                            on the Service to access additional services
                            provided in the Service, available only to
                            registered Service Users.
                        </li>
                        <li>Registration on the Service is voluntary.</li>
                        <li>Registration on the Service is free.</li>
                        <li>
                            Each Service User can have only one account on the
                            Service.
                        </li>
                        <li>
                            Technical requirements related to account
                            registration:
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Having an individual email account,</li>
                            </ul>
                        </li>
                        <li>
                            Service Users registering on the Service consent to
                            the processing of their personal data by the Service
                            Provider to the extent that they were entered into
                            the Service during the registration process and
                            their subsequent changes or deletion.
                        </li>
                        <li>
                            The Service Provider has the right to suspend or
                            delete Service User accounts at its discretion,
                            thereby preventing or restricting access to
                            individual or all Service services, content,
                            materials, and resources, especially if the Service
                            User violates the Terms, applicable legal
                            regulations, principles of social coexistence, or
                            acts to the detriment of the Service Provider or
                            other Service Users, the legitimate interests of the
                            Service Provider, and third parties cooperating or
                            not with the Service Provider.
                        </li>
                        <li>
                            All Service offerings may be changed in terms of
                            content and scope, added or subtracted, and may also
                            be temporarily suspended or access to them may be
                            restricted according to the Service Provider’s
                            discretionary decision, without the possibility of
                            objection in this regard by Service Users.
                        </li>
                        <li>
                            Additional security rules regarding account use:
                            <ul className="list-disc pl-6 space-y-2">
                                <li>
                                    Registered Service Users are prohibited from
                                    sharing their login and password for their
                                    account with third parties.
                                </li>
                                <li>
                                    The Service Provider has no right and will
                                    never ask the Service User for the password
                                    to their chosen account.
                                </li>
                            </ul>
                        </li>
                        <li>
                            Account deletion:
                            <ul className="list-disc pl-6 space-y-2">
                                <li>
                                    Each Service User with an account on the
                                    Service has the possibility to independently
                                    delete their account from the Service.
                                </li>
                                <li>
                                    Service Users can do this by logging into
                                    the Service panel.
                                </li>
                                <li>
                                    Deleting an account results in the removal
                                    of all Service User identification data and
                                    the anonymization of the username and email
                                    address.
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <h2 className="text-xl font-semibold mt-6 mb-2 text-center">
                        V. Terms of Newsletter Service
                    </h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            Service Users can use the Service without the need
                            to subscribe to the Newsletter.
                        </li>
                        <li>
                            Subscribing to the Newsletter service is voluntary.
                        </li>
                        <li>Subscribing to the Newsletter service is free.</li>
                        <li>
                            Technical requirements related to the Newsletter
                            service:
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Having an individual email account,</li>
                            </ul>
                        </li>
                        <li>
                            Terms of the Newsletter service:
                            <ul className="list-disc pl-6 space-y-2">
                                <li>
                                    Providing an individual email account in the
                                    electronic form,
                                </li>
                                <li>
                                    Verification of the provided email account
                                    by activating the link sent to it,
                                </li>
                                <li>
                                    Expressing consent to receive email
                                    notifications,
                                </li>
                            </ul>
                        </li>
                        <li>
                            Scope of the Newsletter service:
                            <ul className="list-disc pl-6 space-y-2">
                                <li>
                                    Notifying about new updates, posts,
                                    contests, and other promotional activities
                                    related to the services of the Service,
                                </li>
                                <li>
                                    Notifying about promotional activities of
                                    Service partners (Marketing messages),
                                </li>
                            </ul>
                        </li>
                        <li>
                            Unsubscribing from the Newsletter service:
                            <ul className="list-disc pl-6 space-y-2">
                                <li>
                                    Each Service User subscribed to the
                                    Newsletter service has the possibility to
                                    independently unsubscribe from the
                                    Newsletter service.
                                </li>
                                <li>
                                    Service Users can do this by clicking the
                                    link in the email received from the Service.
                                </li>
                                <li>
                                    Unsubscribing from the Newsletter service
                                    results in the removal of the provided email
                                    address from the Service Provider’s
                                    database.
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <h2 className="text-xl font-semibold mt-6 mb-2 text-center">
                        VI. Terms of Communication and Provision of Other
                        Services on the Service
                    </h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            The Service provides services and tools that allow
                            Service Users to interact with the Service in the
                            form of:
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Contact form</li>
                                <li>Commenting on posts and articles</li>
                            </ul>
                        </li>
                        <li>
                            The Service provides contact information in the form
                            of:
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Email address</li>
                            </ul>
                        </li>
                        <li>
                            In the event of contact by Service Users with the
                            Service Provider, the personal data of Service Users
                            will be processed in accordance with the “Privacy
                            Policy,” which is an integral part of the Terms.
                        </li>
                    </ul>
                    <h2 className="text-xl font-semibold mt-6 mb-2 text-center">
                        VII. Collection of User Data
                    </h2>
                    <p>
                        For the proper provision of services by the Service,
                        legal protection of the Service Provider’s interests,
                        and to ensure the compliance of the Service’s operation
                        with applicable law, the Service Provider collects and
                        processes certain data about Users through the Service.
                    </p>
                    <p>
                        For the proper provision of services, the Service uses
                        and stores some anonymous information about Users in
                        cookies.
                    </p>
                    <p>
                        The scope, purposes, method, and rules of data
                        processing are available in the attachments to the
                        Terms: “Information obligation under GDPR” and in the
                        “Privacy Policy,” which is an integral part of the
                        Terms.
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            Data collected automatically: For the efficient
                            operation of the Service and for statistics, some
                            data about Users is automatically collected. This
                            includes:
                            <ul className="list-disc pl-6 space-y-2">
                                <li>IP address</li>
                                <li>Browser type</li>
                                <li>Screen resolution</li>
                                <li>Approximate location</li>
                                <li>Opened subpages of the service</li>
                                <li>
                                    Time spent on a specific subpage of the
                                    service
                                </li>
                                <li>Operating system type</li>
                                <li>Previous subpage address</li>
                                <li>Referring page address</li>
                                <li>Browser language</li>
                                <li>Internet connection speed</li>
                                <li>Internet service provider</li>
                                <li>
                                    Anonymous demographic data based on Google
                                    Analytics:
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>Gender</li>
                                        <li>Age</li>
                                        <li>Interests</li>
                                    </ul>
                                </li>
                            </ul>
                            <li>
                                Data collected during registration: User name,
                                first and last name, email address In the case
                                of logged-in Users (those with an account on the
                                Service), an identifier associated with the
                                User’s account may be placed in cookies stored
                                on the User’s device
                            </li>
                            <li>
                                Data collected during newsletter subscription:
                                Email address
                            </li>
                        </li>
                    </ul>
                    <h2 className="text-xl font-semibold mt-6 mb-2 text-center">
                        VIII. Copyrights
                    </h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            The owner of the Service and copyrights to the
                            service is the Service Provider.
                        </li>
                        <li>
                            Some of the data posted on the Service is protected
                            by copyrights belonging to companies, institutions,
                            and third-party individuals not related to the
                            Service Provider in any way. It is used based on
                            obtained licenses or licenses free of charge.
                        </li>
                        <li>
                            Based on the Act of February 4, 1994, on copyright
                            and related rights, it is forbidden to use, copy,
                            reproduce in any form, and store in search engines,
                            excluding Google, Bing, Yahoo, NetSprint,
                            DuckDuckGo, Facebook, and LinkedIn, any articles,
                            descriptions, photos, and all other content, graphic
                            materials, video, or audio in the Service without
                            the written consent or consent given via Electronic
                            Communication of their legal owner.
                        </li>
                        <li>
                            According to the Act of February 4, 1994, on
                            copyright protection, simple press information,
                            understood as information alone, without the
                            author’s commentary and evaluation, is not subject
                            to protection. The author understands this as the
                            possibility of using information from texts posted
                            on the service, but not copying the whole or part of
                            the articles unless indicated in the respective
                            material provided in the Service.
                        </li>
                    </ul>
                    <h2 className="text-xl font-semibold mt-6 mb-2 text-center">
                        IX. Changes to the Terms
                    </h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            All provisions of the Terms may be unilaterally
                            changed by the Service Provider at any time, without
                            giving reasons.
                        </li>
                        <li>
                            Information about the change of the Terms will be
                            sent electronically to Users registered on the
                            Service.
                        </li>
                        <li>
                            In the event of a change in the Terms, its
                            provisions come into effect immediately after its
                            publication for Users without an account on the
                            Service.
                        </li>
                        <li>
                            In the event of a change in the Terms, its
                            provisions come into effect with a 7-day
                            transitional period for Users with accounts on the
                            Service registered before the change of the Terms.
                        </li>
                        <li>
                            It is considered that each User continuing to use
                            the Service after a change in the Terms accepts it
                            in full.
                        </li>
                    </ul>
                    <h2 className="text-xl font-semibold mt-6 mb-2 text-center">
                        X. Final Provisions{" "}
                    </h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            The Service Provider is not responsible in any way,
                            except as allowed by applicable law, for the content
                            transmitted and published on the Service by Service
                            Users, for its accuracy, reliability, authenticity,
                            or legal defects.
                        </li>
                        <li>
                            The Service Provider will make every effort to
                            ensure that the services of the Service are offered
                            continuously. However, it does not assume any
                            responsibility for disruptions caused by force
                            majeure or unauthorized interference by Service
                            Users, third parties, or the activity of external
                            automated programs.
                        </li>
                        <li>
                            The Service Provider reserves the right to change
                            any information posted on the Service at the
                            discretion of the Service Provider, at a time chosen
                            by the Service Provider, without the need to inform
                            Service Users using the Service.
                        </li>
                        <li>
                            The Service Provider reserves the right to
                            temporarily, completely, or partially disable the
                            Service to improve it, add services, or carry out
                            maintenance, without prior notice to Service Users.
                        </li>
                        <li>
                            The Service Provider reserves the right to
                            permanently disable the Service without prior notice
                            to Service Users.
                        </li>
                        <li>
                            The Service Provider reserves the right to assign in
                            whole or in part all of its rights and obligations
                            related to the Service without the consent and the
                            possibility of expressing any objections by Service
                            Users.
                        </li>
                        <li>
                            Current and previous Service Terms are located on
                            this subpage under the current Terms.
                        </li>
                        <li>
                            In all matters related to the operation of the
                            Service, please contact the Service Provider using
                            one of the following contact methods:
                            <ul className="list-disc pl-6 space-y-2">
                                <li>
                                    Using the contact form available on the
                                    Service
                                </li>
                                <li>
                                    Sending a message to the email address:
                                    office@furnivisual.com
                                </li>
                                <li>
                                    By phone call with the number: (+48)
                                    504-999-310
                                </li>
                            </ul>
                            Contact using the indicated means of communication
                            only for matters related to the conducted Service.
                        </li>
                    </ul>
                </div>
            </section>
        </PageLayout>
    );
}
