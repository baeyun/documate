# Creating your first project with Documate

For this step, you just need to know of the `init` and `start` commands.

By now, you should have Documate CLI globally installed. If not, [follow these procedures](/docs/getting-started/installation). To create a new app, just run:

```bash
documate init
```

in the root of your project folder. This initializes the dummy pages of your docs. Before we start editing, run:

```bash
documate start
```

Again, from the root directory of your project.

## Results

The output of this command should look something like this:

```yaml
|- PROJECT ROOT DIRECTORY
|--- documate/          
|----- /docs             (Place all your docs here)
|----- /public           (Reserved for Documate & Create React App activities)
|----- config.js         (Main configuration file)
|----- logo.png
|----- index.html
|----- navs.js           (Configuration for your app's topnav and sidenav)
|- package.json          (Required to be present in project root directory)
```

You can now edit any of the files in the `/documate` directory. Just make sure to keep links in sync.

> Note
>
> Please read the [Components](/docs/components) section to enable Documate to render your docs properly.
