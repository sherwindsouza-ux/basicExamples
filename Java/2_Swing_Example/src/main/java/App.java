import java.awt.Dimension;
import java.awt.GridLayout;
import java.awt.Rectangle;

import javax.swing.*;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;

import net.miginfocom.swing.MigLayout;

public class App {

    public static void main(String[] args) {
        var f=new JFrame();//creating instance of JFrame

        var largePanel = new JPanel(new MigLayout("debug 4000", "[][grow]"));
        f.add(largePanel);
        var panel = new JPanel(new MigLayout("", "[grow]"));

        var scrollPane = new JScrollPane(panel, ScrollPaneConstants.VERTICAL_SCROLLBAR_AS_NEEDED,
        ScrollPaneConstants.HORIZONTAL_SCROLLBAR_AS_NEEDED);
       
        scrollPane.scrollRectToVisible(null);
        scrollPane.getViewport().addChangeListener(new ChangeListener() {

            @Override
            public void stateChanged(ChangeEvent e) {
                if (scrollPane.getVerticalScrollBar().isVisible()) {
                   var rect = scrollPane.getBounds();
                   rect.height = panel.getHeight() + 20;            
                   if (rect.height < largePanel.getHeight()) {
                        scrollPane.setBounds(rect);
                        scrollPane.revalidate();
                        scrollPane.repaint();                  
                   }
                }
            }
        });        
       
        panel.add(new JLabel("hello"), "wrap");
        panel.add(new JLabel("hello"), "wrap");
        panel.add(new JLabel("hello"), "wrap");
         
        scrollPane.setVisible(true);
       
        JButton b= new JButton("click");
        b.addActionListener(e -> {
            panel.add(new JLabel("hello sdfsadf sdfsdfs sadfasdfsaf sadfasdfsadf sadfasdfsdf"), "wrap");

            panel.revalidate();
            panel.repaint();            
         });

        b.setBounds(130,100,100, 40);//x axis, y axis, width, height

        largePanel.add(b);//adding button in JFrame
        largePanel.add(scrollPane, "width 350:350:350");
        f.setSize(400,500);//400 width and 500 height
        //f.setLayout(null);//using no layout managers
        f.setVisible(true);//making the frame visible
        f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }
}

