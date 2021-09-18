<script>
    import Fa from "svelte-fa";
    import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
    import { faBook } from "@fortawesome/free-solid-svg-icons";

    import Typewriter from "typewriter-effect/dist/core";
    import { onMount } from "svelte";
    import { Link } from "svelte-navigator";

    onMount(() => {
        new Typewriter("#typewriter", {
            strings: [
                "React JS",
                "PHP",
                "SQL",
                "AWS",
                "Svelte",
                '<a href="https://z80.yarbsemaj.com">Z80 Assembly</a>',
                "CSS",
                "SASS",
                "NodeJS",
                "Serverless",
                "HTML",
                "Dynanamo DB",
                "Lambda",
                "Webpack",
                "AngularJS",
                "Javascript",
                "Java",
            ],
            autoStart: true,
            loop: true,
        });
    });
</script>

<svelte:head>
    <title>James Bray</title>
    <meta
        name="description"
        content="Full Stack Software Developer working in Manchester"
    />
</svelte:head>

<div class="container">
    <div class="row justify-content-md-center h-100">
        <div class="col-md-auto my-auto">
            <div class="title">
                <div id="name">James Bray</div>
                <div id="job">Full Stack Software Developer</div>
                <div id="location">Manchester</div>
                <div class="typewriterWrapper">
                    <code id="typewriter" class="code" />
                </div>
            </div>
            <div class="links">
                <a alt="Github" href="https://github.com/yarbsemaj">
                    <Fa icon={faGithub} />
                </a>
                <a alt="Linkedin" href="https://www.linkedin.com/in/yarbsemaj">
                    <Fa icon={faLinkedin} />
                </a>
                <Link alt="Blog" to="/blog">
                    <Fa icon={faBook} />
                </Link>
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    .container {
        margin-top: auto;
        margin-bottom: auto;
        height: 100vh;
    }
    .links {
        font-size: 100px;
        text-align: center;

        a {
            text-decoration: none !important;
            margin-right: 20px;

            &:last-of-type {
                margin-right: 0;
            }
        }
    }

    .typewriterWrapper {
        text-align: center;

        #typewriter {
            font-family: "Courier Prime";
            font-size: 65%;
        }
    }

    .title {
        font-size: 75px;

        #name {
            text-align: center;
            font-size: 100%;
        }

        #job {
            text-align: center;
            font-size: 50%;
        }

        #location {
            text-align: center;
            font-size: 40%;
        }
    }

    @media (max-width: 450px) {
        .title {
            font-size: 50px !important;
        }

        .links {
            font-size: 75px;
        }
    }
</style>
