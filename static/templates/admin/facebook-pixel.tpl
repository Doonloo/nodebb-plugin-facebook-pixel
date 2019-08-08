<div class="row">
    <div class="col-sm-12 col-md-8">
        <h1><i class="fa fa-facebook-square"></i> Facebook Pixel Configuration</h1>
        <p>
            You need to provide your Facebook Pixel ID to match all events occurring in your NodeBB forum to Facebook for Business.
        </p>
        <p>
            You can learn more at the <a href="https://www.facebook.com/business/help/952192354843755" target="_blank">Facebook Ads Help Center</a>.
        </p>
        <form role="form" class="facebook-pixel-settings form-horizontal">
            <div class="form-group">
                <label for="facebook_pixel_id"></label>
                <input class="form-control" type="text" id="facebook_pixel_id" name="pixel_id" placeholder="Pixel ID">
            </div>
            <button type="submit" class="btn btn-primary" id="save">
                <i class="fa fa-save"></i> Save
            </button>
        </form>
    </div>
</div>

<script type="text/javascript">
    require(["settings"], function (Settings) {
        Settings.load("facebook-pixel", $(".facebook-pixel-settings"));

        $("#save").click(function (e) {
            e.preventDefault();

            Settings.save("facebook-pixel", $(".facebook-pixel-settings"), function () {
                app.alert({
                    type: "success",
                    alert_id: "facebook-pixel-id-saved",
                    title: "",
                    message: "Pixel ID saved."
                });
            });
        });
    })
</script>
