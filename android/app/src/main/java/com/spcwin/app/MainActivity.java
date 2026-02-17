package com.spcwin.app;

import android.os.Bundle;
import android.view.View;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Force system bars to push content down
        ViewCompat.setOnApplyWindowInsetsListener(
            getWindow().getDecorView(),
            (view, insets) -> {
                int top = insets.getInsets(WindowInsetsCompat.Type.statusBars()).top;
                int bottom = insets.getInsets(WindowInsetsCompat.Type.navigationBars()).bottom;

                view.setPadding(0, top, 0, bottom);
                return insets;
            }
        );
    }
}